import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { getPedalBySlug, updatePedal } from "../../../services/pedalService";

const PEDAL_TYPES = [
    "Overdrive", "Distortion", "Fuzz", "Boost / Clean Boost", "Treble Boost",
    "Preamp", "Amp-in-a-box", "Chorus", "Flanger", "Phaser", "Tremolo",
    "Vibrato", "Rotary Speaker / Leslie", "Uni-Vibe", "Ring Modulator", "Delay",
    "Reverb", "Echo / Tape Echo", "Multi-delay", "Octave", "Pitch Shifter",
    "Harmonizer", "Whammy / Expression Pitch", "Detune", "Micro Pitch", "Wah",
    "Auto Wah", "Envelope Filter", "Touch Wah", "Resonant Filter", "Compressor",
    "Limiter", "Expander", "Noise Gate / Noise Suppressor", "Sustainer",
    "EQ (Graphic)", "EQ (Parametric)", "Tone Shaper", "Cab Simulator", "IR Loader",
    "Volume Pedal", "Expression Pedal", "Loop Switcher", "A/B Switch", "A/B/Y Switch",
    "Line Selector", "Buffer", "Synth Pedal", "Bitcrusher", "Glitch",
    "Freeze / Sustain", "Feedback Generator", "Sample / Hold", "Step Filter",
    "Multi-FX Processor", "Amp Modeler", "Floor Modeler", "Looper", "Phrase Sampler",
];

export default function EditPedal() {
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
                const data = await getPedalBySlug(slug);
                setForm(data);
            } catch (err) {
                setError("Pedal not found.");
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
            await updatePedal(form.id, form);
            setSuccess("Pedal updated successfully.");
        } catch (err) {
            setError(err.message || "Failed to update pedal.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <section className="panel"><p>Loading...</p></section>;
    if (!form) return <section className="panel"><p>{error}</p></section>;

    return (
        <>
            <header className="panel text-center">
                <h1>Edit Pedal</h1>
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
                        <label htmlFor="pedalType">Pedal Type</label>
                        <select id="pedalType" name="pedalType" value={form.pedalType} onChange={handleChange}>
                            <option value="">-- Select --</option>
                            {PEDAL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="checkbox" name="isBassPedal" checked={form.isBassPedal} onChange={handleChange} />
                            {" "}Bass Pedal
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