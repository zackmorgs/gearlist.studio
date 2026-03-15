import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getGenres } from "../services/genreService";
// import { getBands } from "../services/bandService";

export default function Genres() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setGenres(await getGenres());
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
                <h1>Genres</h1>
            </header>
            <section id="genre_browse" className="panel">
                {genres.length > 0 ? (
                    <ul className="genre-list">
                        {genres.map((genre) => (
                            <li key={genre.id} className="genre-card">
                                <Link to={`/genres/${genre.slug.value}`}>
                                    {genre.photoUrl && (<img src={genre.photoUrl} alt={genre.displayName} className="genre-photo" />)}
                                    {genre.photoUrl ? (
                                        <div className="overlay">
                                            <h3>{genre.displayName}</h3>
                                        </div>
                                    ) : (
                                        <h3 className="no-photo text-center">{genre.displayName}</h3>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div id="no-genres">
                        <p>No genres found.</p>
                        <a href="/genres/new" className="btn">Add a genre</a>
                    </div>
                )}
            </section>
        </>
    );
}