import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { getBand, updateBand } from "../../services/bandService";

export default function EditBand() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [genreTagsInput, setGenreTagsInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        async function load() {
            try {
                const data = await getBand(slug);
                setForm(data);
                setGenreTagsInput((data.genreTags || []).join(", "));
            } catch (err) {
                setError("Band not found.");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [slug]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleGenreTagsChange(e) {
        setGenreTagsInput(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");
        const genreTags = genreTagsInput.split(",").map(t => t.trim()).filter(Boolean);
        try {
            await updateBand(form.id, { ...form, genreTags });
            setSuccess("Band updated successfully.");
        } catch (err) {
            setError(err.message || "Failed to update band.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <section className="panel"><p>Loading...</p></section>;
    if (!form) return <section className="panel"><p>{error}</p></section>;

    return (
        <>
            <header className="panel text-center">
                <h1>Edit Band</h1>
            </header>
            <section className="panel">
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {/* <label htmlFor="displayName">Display Name</label> */}
                        <input className="input" id="displayName" name="displayName" type="text" value={form.displayName} onChange={handleChange} required />
                    </div>
                    <br />
                    <div className="form-group">
                        {/* <label htmlFor="description">Description</label> */}
                        <Editor
                            apiKey="scgdo10tw7b74zk4lfomtw3eirvn8xw863dvg77qifj7ctqk"
                            value={form.description}
                            init={{ height: 220, menubar: false, plugins: ["lists", "link", "code"], toolbar: "undo redo | bold italic | bullist numlist | link | code" }}
                            onEditorChange={(content) => setForm(prev => ({ ...prev, description: content }))}
                        />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input id="imageUrl" name="imageUrl" type="url" value={form.imageUrl} onChange={handleChange} />
                    </div> */}
                    <br />
                    <div className="form-group">
                        {/* <label htmlFor="genreTags">Genre Tags <small>(comma-separated)</small></label> */}
                        <input className="input" id="genreTags" name="genreTags" type="text" value={genreTagsInput} onChange={handleGenreTagsChange} placeholder="e.g. Rock, Metal, Blues" />
                    </div>
                    <br />
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                        <button type="button" className="btn" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </form>
            </section>
        </>
    );
}