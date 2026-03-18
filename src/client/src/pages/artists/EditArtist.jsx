import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { getArtistBySlug, updateArtist } from "../../services/artistService";

export default function EditArtist() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [rolesInput, setRolesInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        async function load() {
            try {
                const data = await getArtistBySlug(slug);
                setForm(data);
                setRolesInput((data.roles || []).join(", "));
            } catch (err) {
                setError("Artist not found.");
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

    function handleRolesChange(e) {
        setRolesInput(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");
        const roles = rolesInput.split(",").map(r => r.trim()).filter(Boolean);
        try {
            await updateArtist(form.id, { ...form, roles });
            setSuccess("Artist updated successfully.");
        } catch (err) {
            setError(err.message || "Failed to update artist.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <section className="panel"><p>Loading...</p></section>;
    if (!form) return <section className="panel"><p>{error}</p></section>;

    return (
        <>
            <header className="panel text-center">
                <h1>Edit Artist</h1>
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
                        {/* <label htmlFor="roles">Roles <small>(comma-separated)</small></label> */}
                        <input className="input" id="roles" name="roles" type="text" value={rolesInput} onChange={handleRolesChange} placeholder="e.g. Guitarist, Vocalist" />
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