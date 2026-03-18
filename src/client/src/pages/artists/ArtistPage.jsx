import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

import { getArtistBySlug, updateArtist } from "../../services/artistService";
import { batchGetEquipment, searchEquipment } from "../../services/equipmentService";


export default function ArtistPage() {
    const [artist, setArtist] = useState(null);
    const { slug } = useParams();
    const [expandDescription, setExpandDescription] = useState(false);

    const hasDescription = Boolean(artist?.description?.trim());
    const safeDescriptionHtml = hasDescription ? DOMPurify.sanitize(artist.description) : "";

    const [equipmentItems, setEquipmentItems] = useState([]);

    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [addError, setAddError] = useState("");
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (showSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showSearch]);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        const timer = setTimeout(async () => {
            setSearching(true);
            try {
                const results = await searchEquipment(searchQuery);
                setSearchResults(results);
            } catch (err) {
                console.error(err);
            } finally {
                setSearching(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    async function handleAddEquipment(item) {
        if (!artist) return;
        const alreadyAdded = (artist.equipmentGuids || []).includes(item.id);
        if (alreadyAdded) return;
        const updated = {
            ...artist,
            equipmentGuids: [...(artist.equipmentGuids || []), item.id],
        };
        try {
            const saved = await updateArtist(artist.id, updated);
            setArtist(saved);
            setAddError("");
        } catch (err) {
            setAddError("Failed to add equipment. Please try again.");
            console.error(err);
        }
    }

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

    useEffect(() => {
        if (!artist?.equipmentGuids?.length) {
            setEquipmentItems([]);
            return;
        }
        async function fetchEquipment() {
            try {
                const items = await batchGetEquipment(artist.equipmentGuids);
                setEquipmentItems(items);
            } catch (err) {
                console.error("Failed to load equipment:", err);
            }
        }
        fetchEquipment();
    }, [artist?.equipmentGuids]);

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
                            <Link to={`/artists/${slug}/edit`} className="btn"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z" /></svg> Edit</Link>
                        </div>
                    </header>
                    <section id="artist_equipment" className="panel">
                        <h2>Equipment</h2>
                        {equipmentItems.length > 0 ? (
                            <ul className="search-list">
                                {equipmentItems.map(item => (
                                    <li key={item.id} className="search-card">
                                        {item.imageUrl && <img src={item.imageUrl} alt={item.displayName} className="search-photo" />}
                                        <div className="overlay">
                                            <span className="equipment-search-result-name">{item.displayName}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No equipment information available.</p>
                        )}
                        <br />
                        <button className="btn btn-primary" onClick={() => { setShowSearch(true); setSearchQuery(""); setSearchResults([]); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg> <span>Add Equipment</span>
                        </button>

                        {showSearch && (
                            <div id="equipment_search_panel" className="equipment-search-panel">
                                <div className="equipment-search-header">
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        className="equipment-search-input"
                                        placeholder="Search amps, pedals, instruments..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                    <button className="btn btn-secondary" onClick={() => setShowSearch(false)}>Cancel</button>
                                </div>
                                {addError && <p className="equipment-search-error">{addError}</p>}
                                {searching && <p className="equipment-search-status">Searching...</p>}
                                {!searching && searchQuery.trim() && searchResults.length === 0 && (
                                    <p className="equipment-search-status">No results found.</p>
                                )}
                                {searchResults.length > 0 && (
                                    <ul className="search-list">
                                        {searchResults.map(item => {
                                            const alreadyAdded = (artist.equipmentGuids || []).includes(item.id);
                                            return (
                                                <li key={item.id} className={`search-card${alreadyAdded ? " already-added" : ""}`}>
                                                    {item.imageUrl && <img src={item.imageUrl} alt={item.displayName} className="search-photo" />}
                                                    {alreadyAdded ? (
                                                        <div className="overlay-middle">
                                                            <p>Already Added</p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="overlay-middle"
                                                            onClick={() => handleAddEquipment(item)}
                                                            disabled={alreadyAdded}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg>
                                                        </div>
                                                    )}


                                                    <div className="overlay">
                                                        {/* <span className="equipment-search-result-type">{item.type}</span> */}
                                                        <span className="equipment-search-result-name">{item.displayName}</span>
                                                        <br />

                                                    </div>

                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        )}

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