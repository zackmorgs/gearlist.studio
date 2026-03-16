import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getBands } from "../../services/bandService";
import { getGenres } from "../../services/genreService";


export default function Bands() {
    const [bands, setBands] = useState([]);
    const [genres, setGenres] = useState([]);
    const [bandList, setBandList] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                setBands(await getBands());
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

        const filtered = bands.filter((band) => {
            const bandGenreGuids = band.genreGuids || [];
            const bandGenreTags = band.genreTags || [];

            const matchesGenre =
                !selectedGenreId ||
                bandGenreGuids.includes(selectedGenreId) ||
                bandGenreTags.includes(selectedGenreId);

            const searchableText = `${band.displayName || ""} ${band.description || ""}`.toLowerCase();
            const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);

            return matchesGenre && matchesSearch;
        });

        setBandList(filtered);
    }, [bands, selectedGenreId, searchTerm]);

    function getBandSlug(band) {
        if (typeof band?.slug === "string") {
            return band.slug;
        }
        return band?.slug?.value || "";
    }

    return (
        <>
            <header className="panel text-center">
                <h1>Bands</h1>
                <p>Browse and discover your favorite band's gear.</p>
            </header>
            <section id="band_browse" className="panel">
                <span className="label">Filter:</span>
                <div className="input-group">
                    <select
                        className="input input-select"
                        value={selectedGenreId}
                        onChange={(e) => setSelectedGenreId(e.target.value)}
                    >
                        <option value="">All genres</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.slug?.value || genre.id}>{genre.displayName}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <svg className="icon-search" xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 -960 960 960" width="1rem" fill="#111111"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                    <input
                        id="search_input"
                        type="search"
                        placeholder="Search bands..."
                        className="input input-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <br />


                {bandList.length === 0 ? (
                    <div id="no-search-results" className="text-center">
                        <p>No bands found.</p>
                        <Link to="/bands/new" className="btn">Add a band</Link>
                    </div>

                ) : (
                    <>
                        <ul className="band-list">
                            {bandList.map((band) => (
                                <li key={band.id} className="band-card">
                                    <Link to={`/bands/${getBandSlug(band)}`} className="band-link">
                                        <img className="band-photo" src={band.imageUrl || "/placeholder-band.png"} alt={band.displayName} />
                                        <div className="overlay">
                                            <h3>{band.displayName}</h3>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <br />
                        <Link to="/bands/new" className="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg> <span>Add Band</span>
                        </Link>
                    </>
                )}
            </section>
        </>
    );
}