import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { getInstrumentBySlug, updateInstrument } from "../../../services/instrumentService";

export default function EditInstrument() {
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
                const data = await getInstrumentBySlug(slug);
                setForm(data);
            } catch (err) {
                setError("Instrument not found.");
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

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");
        try {
            await updateInstrument(form.id, form);
            setSuccess("Instrument updated successfully.");
            window.setTimeout(() => navigate(-1), 1500);
        } catch (err) {
            setError(err.message || "Failed to update instrument.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <section className="panel"><p>Loading...</p></section>;
    if (!form) return <section className="panel"><p>{error}</p></section>;

    return (
        <>
            <header className="panel text-center">
                <h1>Edit Instrument</h1>
            </header>
            <section className="panel">
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {/* <label className="label" htmlFor="displayName">Display Name</label> */}
                        <input className="input" id="displayName" name="displayName" type="text" value={form.displayName} onChange={handleChange} required />
                    </div>
                    <br />
                    <div className="form-group">
                        {/* <label className="label" htmlFor="description">Description</label> */}
                        <Editor
                            apiKey="scgdo10tw7b74zk4lfomtw3eirvn8xw863dvg77qifj7ctqk"
                            value={form.description}
                            init={{ height: 220, menubar: false, plugins: ["lists", "link", "code"], toolbar: "undo redo | bold italic | bullist numlist | link | code" }}
                            onEditorChange={(content) => setForm(prev => ({ ...prev, description: content }))}
                        />
                    </div>
                    <br />
                    {/* <div className="form-group">
                        <label className="label" htmlFor="imageUrl">Image URL</label>
                        <input id="imageUrl" name="imageUrl" type="url" value={form.imageUrl} onChange={handleChange} />
                    </div> */}
                    <div className="form-group">
                        <label className="label" htmlFor="price">Price</label>
                        <input className="input" id="price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" />
                    </div>
                    <br />
                    <div className="form-group">
                        <label className="label" htmlFor="amazonID">Amazon ID</label>
                        <input className="input" id="amazonID" name="amazonID" type="text" value={form.amazonID} onChange={handleChange} />
                    </div>
                    <br />
                    {/* <div className="form-group">
                        <label className="label" htmlFor="instrumentTypeGuid">Instrument Type ID</label>
                        <input className="input" id="instrumentTypeGuid" name="instrumentTypeGuid" type="text" value={form.instrumentTypeGuid} onChange={handleChange} />
                    </div> */}
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