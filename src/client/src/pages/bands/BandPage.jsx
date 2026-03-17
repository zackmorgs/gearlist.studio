import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";

import { getBand } from "../../services/bandService";
import { getArtist } from "../../services/artistService";

export default function BandPage() {
    const { slug } = useParams();
    const [band, setBand] = useState(null);
    const [artistsFromBand, setArtistsFromBand] = useState([]);
    const [expandDescription, setExpandDescription] = useState(false);

    const hasDescription = Boolean(band?.description?.trim());
    const safeDescriptionHtml = hasDescription ? DOMPurify.sanitize(band.description) : "";

    useEffect(() => {
        async function fetchBand() {
            try {
                const data = await getBand(slug);
                setBand(data);

                const artistIds = data?.artistGuids || [];
                if (artistIds.length === 0) {
                    setArtistsFromBand([]);
                    return;
                }

                const artists = await Promise.all(
                    artistIds.map(async (artistId) => {
                        try {
                            return await getArtist(artistId);
                        } catch {
                            return null;
                        }
                    })
                );

                setArtistsFromBand(artists.filter(Boolean));
            } catch (err) {
                console.error(err);
                setBand(null);
                setArtistsFromBand([]);
            }
        }

        fetchBand();
    }, [slug]);

    if (!band) {
        return (
            <section className="panel text-center">
                <h1>Band Not Found</h1>
            </section>
        );
    }

    return (
        <>
            <header
                id="band_page_header"
                className="panel text-center"
                style={{ backgroundImage: `url(${band.imageUrl || "/placeholder-band.png"})` }}
            >
                <div className="overlay">
                    <h1>{band.displayName}</h1>
                </div>
            </header>

            <section id="band_page_bio" className="panel">
                <h2 id="bio_header">Bio</h2>
                <div className={`description-toggle${expandDescription ? " expanded" : ""}`}>
                    {hasDescription ? (
                        <>
                            <div dangerouslySetInnerHTML={{ __html: safeDescriptionHtml }} />
                            {!expandDescription && (
                                <div id="toggle_overlay">
                                    <div id="toggle_toggle" onClick={() => setExpandDescription(true)}>
                                        <b>Expand</b>
                                        <br />
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M480-333 240-573l51-51 189 189 189-189 51 51-240 240Z" /></svg>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <p>No bio available.</p>
                    )}
                </div>
            </section>

            <section id="band_artists" className="panel">
                <h3>Artists</h3>
                {artistsFromBand.length > 0 ? (
                    <ul>
                        {artistsFromBand.map((artist) => (
                            <li key={artist.id}>
                                <Link to={`/artists/${artist.slug?.value || artist.slug}`}>
                                    {artist.displayName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No artists found for this band.</p>
                )}
                <Link to={`/bands/${band.slug.value}/add-member/`} className="btn">Add an Artist</Link>
            </section>
        </>
    );
}