import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Editor } from '@tinymce/tinymce-react';

import { getGenres } from "../../services/genreService";
import { createArtist } from "../../services/artistService";

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
}

export default function NewArtistPage() {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [displayName, setDisplayName] = useState("");
    const [genreId, setGenreId] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        async function fetchGenres() {
            try {
                setGenres(await getGenres());
            } catch (err) {
                console.error(err);
            }
        }
        fetchGenres();
    }, []);

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }

    async function uploadImage(file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (!res.ok) throw new Error("Image upload failed.");
        const data = await res.json();
        return data.url;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!displayName.trim()) {
            setError("Artist name is required.");
            return;
        }
        setError("");
        setSubmitting(true);
        try {
            let imageUrl = "";
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }
            const slug = slugify(displayName);
            const artist = {
                slug: { value: slug },
                displayName: displayName.trim(),
                description,
                imageUrl,
                genreGuids: genreId ? [genreId] : [],
                bandGuids: [],
                equipmentGuids: [],
                roles: [],
            };
            const created = await createArtist(artist);
            navigate(`/artists/${created.slug?.value ?? slug}`);
        } catch (err) {
            setError(err.message ?? "Failed to create artist. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <header className="panel text-center">
                <h1>New Artist</h1>
            </header>
            <section className="panel">
                <form onSubmit={handleSubmit}>
                    <input
                        id="artist_name_input"
                        type="text"
                        className="input"
                        placeholder="Artist Name..."
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                    <br />
                    {genres.length > 0 && (
                        <select
                            id="artist_genre_input"
                            className="input"
                            value={genreId}
                            onChange={(e) => setGenreId(e.target.value)}
                        >
                            <option value="">Select Genre...</option>
                            {genres.map(genre => (
                                <option key={genre.id} value={genre.id}>{genre.displayName}</option>
                            ))}
                        </select>
                    )}
                    <br />
                    <Editor
                        apiKey='scgdo10tw7b74zk4lfomtw3eirvn8xw863dvg77qifj7ctqk'
                        id="artist_bio_input"
                        className="input"
                        placeholder="Artist Description..."
                        style={{ height: "10rem" }}
                        value={description}
                        onEditorChange={(content) => setDescription(content)}
                    />
                    <br />
                    <label className="label" htmlFor="artist_file_input">Photo</label>
                    <input
                        id="artist_file_input"
                        type="file"
                        className="input"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="artist-photo"
                            style={{ marginTop: "0.75rem", maxWidth: "180px" }}
                        />
                    )}
                    <br />
                    {error && <p className="subtitle">{error}</p>}
                    <br />
                    <button className="btn" type="submit" disabled={submitting}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg>
                        {submitting ? "Creating..." : "Create Artist"}
                    </button>
                </form>
            </section>
        </>
    );
}