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
            <header id="band_page_header">
                <div className="container">
                    <div className="panel text-center" style={{ backgroundImage: `url(${band.imageUrl || "/placeholder-band.png"})` }}>
                        <div className="overlay">
                            <h1>{band.displayName}</h1>
                            <br />
                            <Link to={`/bands/${slug}/edit`} className="btn"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z" /></svg> Edit</Link>
                        </div>
                    </div>
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
                <h2>Artists</h2>
                {artistsFromBand.length > 0 ? (
                    <ul className="artist-list">
                        {artistsFromBand.map((artist) => (
                            <li className="artist-card" key={artist.id}>
                                <Link className="artist-link" to={`/artists/${artist.slug?.value || artist.slug}`}>
                                    <img src={artist.imageUrl || "/placeholder-artist.png"} alt={artist.displayName} className="artist-photo" />
                                    <div className="overlay">
                                        <span className="artist-name">{artist.displayName}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No artists found for this band.</p>
                )}
                <br />
                <Link to={`/bands/${band.slug.value}/add-member/`} className="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg> <span>Add an Artist</span>
                </Link>
            </section>
        </>
    );
}