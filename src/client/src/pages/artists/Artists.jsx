import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getArtists } from "../../services/artistService";
import { getGenres } from "../../services/genreService";


export default function Artists() {
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [artistList, setArtistList] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                setArtists(await getArtists());
                setGenres(await getGenres());
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        const filtered = artists.filter((artist) => {
            const artistGenreGuids = artist.genreGuids || [];

            const matchesGenre = !selectedGenreId || artistGenreGuids.includes(selectedGenreId);

            const searchableText = `${artist.displayName || ""} ${artist.description || ""}`.toLowerCase();
            const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);

            return matchesGenre && matchesSearch;
        });

        setArtistList(filtered);
    }, [artists, selectedGenreId, searchTerm]);

    function getArtistSlug(artist) {
        if (typeof artist?.slug === "string") {
            return artist.slug;
        }
        return artist?.slug?.value || "";
    }

    return (
        <>
            <header>
                <div className="container">
                    <div className="panel text-center">
                        <h1>Artists</h1>
                        <p>Browse and discover your favorite artist's gear.</p>
                    </div>
                </div>
            </header>
            <section id="artist_browse">
                <div className="container">
                    <div className="panel">
                        <span className="label">Filter:</span>
                        <div className="input-group">
                            <select
                                className="input input-select"
                                value={selectedGenreId}
                                onChange={(e) => setSelectedGenreId(e.target.value)}
                            >
                                <option value="">All genres</option>
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>{genre.displayName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <svg className="icon-search" xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 -960 960 960" width="1rem" fill="#111111"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                            <input
                                id="search_input"
                                type="search"
                                placeholder="Search artists..."
                                className="input input-search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <br />


                        {artistList.length === 0 ? (
                            <div id="no-search-results" className="text-center">
                                <p>No artists found.</p>
                                <Link to="/artists/new" className="btn">Add an artist</Link>
                            </div>

                        ) : (
                            <>
                                <ul className="artist-grid">
                                    {artistList.map((artist) => (
                                        <li key={artist.id} className="artist-card">
                                            <Link to={`/artists/${getArtistSlug(artist)}`} className="artist-card">
                                                <img className="artist-photo" src={artist.imageUrl || "/placeholder-artist.png"} alt={artist.displayName} />
                                                <div className="overlay">
                                                    <h3>{artist.displayName}</h3>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <br />
                                <Link to="/artists/new" className="btn btn-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg> <span>Add Artist</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}