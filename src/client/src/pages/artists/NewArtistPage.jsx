import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getGenres } from "../../services/genreService";


export default function NewArtistPage() {
    const [genres, setGenres] = useState([]);
    const [artistGenre, setArtistGenre] = useState("");

    useEffect(() => {
        async function fetchGenres() {
            try {
                const genresData = await getGenres();
                setGenres(genresData);
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchGenres();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // Handle file upload logic here (e.g., upload to server or convert to base64)
        console.log("Selected file:", file);
    }




    return (
        <>
            <header className="panel text-center">
                <h1>New Artist Page</h1>
            </header>
            <section className="panel">
                <input id="artist_file_input" type="file" className="input" accept="image/*" onChange={handleFileChange} />
                <br />
                <input id="artist_name_input" type="text" className="input" placeholder="Artist Name..." />
                <br />
                {genres && (
                    <select id="artist_genre_input" className="input" onChange={(e) => setArtistGenre(e.target.value)}>
                        <option value="">Select Genre...</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.slug.value}>{genre.displayName}</option>
                        ))}
                    </select>
                )}
                <br />
                <textarea id="artist_bio_input" className="input" placeholder="Artist Biography..." style={{ height: "10rem" }}></textarea>
                <br />
                <button className="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg> Create Artist
                </button>
            </section>
        </>
    );
}