import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { getPluginBySlug, updatePlugin } from "../../../services/pluginService";

const PLUGIN_TYPES = [
    "Amp Simulator", "Cabinet Simulator", "Impulse Response Loader",
    "Overdrive", "Distortion", "Fuzz", "Boost", "Chorus", "Flanger",
    "Phaser", "Tremolo", "Vibrato", "Rotary Speaker", "Delay", "Echo",
    "Reverb", "Compressor", "Limiter", "Expander", "Noise Gate", "De-Esser",
    "Equalizer", "Dynamic EQ", "Saturation", "Exciter", "Transient Shaper",
    "Pitch Shifter", "Harmonizer", "Octaver", "Auto-Tune / Pitch Correction",
    "Vocoder", "Ring Modulator", "Bitcrusher", "Granular", "Filter",
    "Auto Filter", "Envelope Filter", "Step Filter", "Guitar Synth",
    "Instrument Synth", "Sampler", "Drum Machine", "Looper", "Multi Effects",
    "Channel Strip", "Preamp", "Tape Emulation", "Console Emulation",
    "Mastering Suite", "Stereo Imager", "Mid/Side Processor", "Metering",
    "Spectrum Analyzer", "Loudness Meter", "Utility",
];

export default function EditPlugin() {
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
                const data = await getPluginBySlug(slug);
                setForm(data);
            } catch (err) {
                setError("Plugin not found.");
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
            await updatePlugin(form.id, form);
            setSuccess("Plugin updated successfully.");
        } catch (err) {
            setError(err.message || "Failed to update plugin.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <section className="panel"><p>Loading...</p></section>;
    if (!form) return <section className="panel"><p>{error}</p></section>;

    return (
        <>
            <header className="panel text-center">
                <h1>Edit Plugin</h1>
            </header>
            <section className="panel">
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label" htmlFor="displayName">Display Name</label>
                        <input id="displayName" className="input" name="displayName" type="text" value={form.displayName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="pluginType">Plugin Type</label>
                        <select id="pluginType" className="input" name="pluginType" value={form.pluginType} onChange={handleChange}>
                            <option value="">-- Select --</option>
                            {PLUGIN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="description">Description</label>
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
                    <div className="form-group">
                        <label className="label" htmlFor="price">Price</label>
                        <input id="price" className="input" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="amazonID">Amazon ID</label>
                        <input id="amazonID" className="input" name="amazonID" type="text" value={form.amazonID} onChange={handleChange} />
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