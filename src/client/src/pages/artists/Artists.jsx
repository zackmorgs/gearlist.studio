import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getArtists } from "../../services/artistService";
import { getGenres } from "../../services/genreService";
import { getInstruments } from "../../services/instrumentService";


export default function Artists() {
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [instruments, setInstruments] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                //  = await getArtistBySlug(slug);
                setArtists(await getArtists());
                setGenres(await getGenres());
                setInstruments(await getInstruments());
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <header className="panel text-center">
                <h1>Artists</h1>
                <p>Browse and discover your favorite artist's gear.</p>
            </header>
            <section id="artist_browse" className="panel">
                <span className="label">Filter:</span>
                <div className="input-group">
                    <select className="input input-select">
                        <option value="">All genres</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>{genre.displayName}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <select className="input input-select">
                        <option value="">All instruments</option>
                        {instruments.map((instrument) => (
                            <option key={instrument.id} value={instrument.id}>{instrument.displayName}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <svg className="icon-search" xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 -960 960 960" width="1rem" fill="#111111"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                    <input id="search_input" type="search" placeholder="Search artists..." className="input input-search" />
                </div>
                <br />


                {artists.length === 0 ? (
                    <div id="no-artists">
                        <p>No artists found.</p>
                        <a href="/artists/new" className="btn">Add an artist</a>
                    </div>

                ) : (
                    <ul className="artist-grid">
                        {artists.map((artist) => (
                            <li key={artist.id}>
                                <Link to={`/artists/${artist.slug}`} className="artist-card">
                                    <h3>{artist.name}</h3>
                                    <p>{artist.genres.map(g => g.displayName).join(", ")}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}


            </section>
        </>
    );
}