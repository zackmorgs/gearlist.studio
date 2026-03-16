import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Editor } from '@tinymce/tinymce-react';

import { getGenres } from "../../services/genreService";
import { createBand } from "../../services/bandService";

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
}


export default function NewBand() {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [genreSlug, setGenreSlug] = useState("");
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
            setError("Band name is required.");
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
            const band = {
                slug: { value: slug },
                displayName: displayName.trim(),
                description,
                artistGuids: [],
                genreTags: genreSlug ? [genreSlug] : [],
                imageUrl,
            };

            await createBand(band);
            navigate("/bands");
        } catch (err) {
            setError(err.message ?? "Failed to create band. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <header className="panel text-center">
                <h1>New Band</h1>
            </header>
            <section className="panel">
                <form onSubmit={handleSubmit}>
                    <input
                        id="band_name_input"
                        type="text"
                        className="input"
                        placeholder="Band Name..."
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                    <br />
                    <Editor
                        apiKey="scgdo10tw7b74zk4lfomtw3eirvn8xw863dvg77qifj7ctqk"
                        id="band_description_input"
                        value={description}
                        init={{
                            height: 220,
                            menubar: false,
                            plugins: ["lists", "link", "code"],
                            toolbar: "undo redo | bold italic | bullist numlist | link | code"
                        }}
                        onEditorChange={(content) => setDescription(content)}
                    />
                    <br />
                    <select
                        id="band_genre_input"
                        className="input input-select"
                        value={genreSlug}
                        onChange={(e) => setGenreSlug(e.target.value)}
                    >
                        <option value="">Select Genre...</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.slug?.value || ""}>
                                {genre.displayName}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label className="label" htmlFor="band_file_input">Photo</label>
                    <input
                        id="band_file_input"
                        type="file"
                        className="input"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="band-photo"
                            style={{ marginTop: "0.75rem", maxWidth: "180px" }}
                        />
                    )}
                    <br />
                    {error && <p className="subtitle">{error}</p>}
                    <button className="btn" type="submit" disabled={submitting}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg>
                        <span>{submitting ? "Creating..." : "Create Band"}</span>
                    </button>
                </form>
            </section>
        </>
    );
}