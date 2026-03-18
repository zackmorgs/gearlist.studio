import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { getCabBySlug, updateCab } from "../../../services/cabService";

export default function EditCab() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        async function load() {
            try {
                const data = await getCabBySlug(slug);
                setForm(data);
            } catch (err) {
                setError("Cab not found.");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [slug]);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");
        try {
            await updateCab(form.id, form);
            setSuccess("Cab updated successfully.");
        } catch (err) {
            setError(err.message || "Failed to update cab.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <section className="panel"><p>Loading...</p></section>;
    if (!form) return <section className="panel"><p>{error}</p></section>;

    return (
        <>
            <header className="panel text-center">
                <h1>Edit Cab</h1>
            </header>
            <section className="panel">
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="displayName">Display Name</label>
                        <input id="displayName" name="displayName" type="text" value={form.displayName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <Editor
                            apiKey="scgdo10tw7b74zk4lfomtw3eirvn8xw863dvg77qifj7ctqk"
                            value={form.description}
                            init={{ height: 220, menubar: false, plugins: ["lists", "link", "code"], toolbar: "undo redo | bold italic | bullist numlist | link | code" }}
                            onEditorChange={(content) => setForm(prev => ({ ...prev, description: content }))}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input id="imageUrl" name="imageUrl" type="url" value={form.imageUrl} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input id="price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amazonID">Amazon ID</label>
                        <input id="amazonID" name="amazonID" type="text" value={form.amazonID} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="checkbox" name="isBassCab" checked={form.isBassCab} onChange={handleChange} />
                            {" "}Bass Cabinet
                        </label>
                    </div>
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