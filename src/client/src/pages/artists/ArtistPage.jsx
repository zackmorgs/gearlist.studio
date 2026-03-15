import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

import { getArtistBySlug } from "../../services/artistService";


export default function ArtistPage() {
    const [artist, setArtist] = useState(null);
    const { slug } = useParams();
    const [expandDescription, setExpandDescription] = useState(false);

    const hasDescription = Boolean(artist?.description?.trim());
    const safeDescriptionHtml = hasDescription ? DOMPurify.sanitize(artist.description) : "";

    const [eqipment, setEquipment] = useState([]);

    useEffect(() => {
        async function fetchArtist() {
            try {
                const data = await getArtistBySlug(slug);
                setArtist(data);
            }
            catch (err) {
                console.error(err);
            }
        }

        fetchArtist();
    }, [slug]);

    const handleExpandToggle = () => {
        setExpandDescription(!expandDescription);
    }


    if (!artist) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {artist ? (
                <>
                    <header className="panel text-center" id="artist_page_header" style={{ backgroundImage: `url(${artist.imageUrl || "/placeholder-artist.png"})` }}>
                        <div className="overlay">
                            <h1>{artist.displayName}</h1>
                        </div>
                    </header>
                    <section id="artist_equipment" class="panel">
                        <h2>Equipment</h2>

                    </section>
                    {!artist.bio &&
                        <section id="artist_page_bio" className="panel">
                            <h2 id="bio_header">Bio</h2>
                            <div className={`description-toggle${expandDescription ? " expanded" : ""}`}>
                                {hasDescription ? (
                                    <>
                                        <div dangerouslySetInnerHTML={{ __html: safeDescriptionHtml }} />
                                        <div id="toggle_overlay">

                                            {!expandDescription &&
                                                <div id="toggle_toggle" onClick={handleExpandToggle}>
                                                    <b>Expand</b>
                                                    <br />
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M480-333 240-573l51-51 189 189 189-189 51 51-240 240Z" /></svg>
                                                </div>
                                            }

                                        </div>
                                    </>
                                ) : (
                                    <p>No bio available.</p>
                                )}
                            </div>
                        </section>
                    }
                </>
            ) : (
                <header className="panel text-center">
                    <h1>Artist Not Found</h1>
                </header>
            )}

        </>
    );
}