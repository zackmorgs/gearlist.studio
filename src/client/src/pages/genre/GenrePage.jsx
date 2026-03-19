import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { getGenreBySlug } from "../../services/genreService";


export default function GenrePage() {
    const { slug } = useParams();
    const [genre, setGenre] = React.useState(null);
    const [bandsFromGenre, setBandsFromGenre] = React.useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const genreName = await getGenreBySlug(slug);
                setGenre(genreName);
                const bands = await getBandsByGenreSlug(slug);
                setBandsFromGenre(bands);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [slug]);

    return (
        <>
            <header>
                <div className="container">
                    <div className="panel text-center">
                        <h1>{genre ? genre.displayName : "Loading..."}</h1>
                        <p>Here you can find all the artists in the database from the "{genre.displayName.toLowerCase()}" genre.</p>

                    </div>
                </div>
            </header>
            {genre ? (
                <>
                    <section id="genre_bands">
                        <div className="container">
                            <div className="panel">
                                <h3>Artists</h3>
                                {bandsFromGenre.length > 0 ? (
                                    <ul>
                                        {bandsFromGenre.map((band) => (
                                            <li key={band.id}>
                                                <Link to={`/artists/${band.slug}`}>{band.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No artists found for this genre.</p>
                                )}
                                <Link to="/" className="btn">
                                    Add an Artist
                                </Link>
                            </div>
                        </div>

                    </section>
                </>
            ) : (
                <section className="panel">
                    <p>Loading...</p>
                </section>
            )}
        </>
    );
}