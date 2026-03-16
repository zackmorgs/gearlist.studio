import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

import { createPlugin } from "../../../services/pluginService";

const PLUGIN_TYPES = [
    "Amp Simulator", "Cabinet Simulator", "Impulse Response Loader",
    "Overdrive", "Distortion", "Fuzz", "Boost",
    "Chorus", "Flanger", "Phaser", "Tremolo", "Vibrato", "Rotary Speaker",
    "Delay", "Echo", "Reverb",
    "Compressor", "Limiter", "Expander", "Noise Gate", "De-Esser",
    "Equalizer", "Dynamic EQ", "Saturation", "Exciter", "Transient Shaper",
    "Pitch Shifter", "Harmonizer", "Octaver", "Auto-Tune / Pitch Correction",
    "Vocoder", "Ring Modulator", "Bitcrusher", "Granular",
    "Filter", "Auto Filter", "Envelope Filter", "Step Filter",
    "Guitar Synth", "Instrument Synth", "Sampler", "Drum Machine", "Looper",
    "Multi Effects", "Channel Strip", "Preamp", "Tape Emulation",
    "Console Emulation", "Mastering Suite", "Stereo Imager",
    "Metering", "Spectrum Analyzer", "Loudness Meter", "Utility",
];

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
}

export default function NewPlugin() {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [pluginType, setPluginType] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

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
            setError("Plugin name is required.");
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
            const plugin = {
                slug: { value: slug },
                displayName: displayName.trim(),
                description,
                pluginType,
                amazonID: "",
                imageUrl,
                price: 0,
            };
            const created = await createPlugin(plugin);
            navigate(`/equipment/plugins/${created.slug?.value ?? slug}`);
        } catch (err) {
            setError("Failed to create plugin. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <header className="panel text-center">
                <h1>New Plugin</h1>
            </header>
            <section className="panel">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="input"
                        placeholder="Plugin Name..."
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                    <br />
                    <select
                        className="input input-select"
                        value={pluginType}
                        onChange={(e) => setPluginType(e.target.value)}
                    >
                        <option value="">Select Plugin Type...</option>
                        {PLUGIN_TYPES.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    <br />
                    <Editor
                        apiKey="scgdo10tw7b74zk4lfomtw3eirvn8xw863dvg77qifj7ctqk"
                        id="plugin_description_input"
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
                    <label className="label" htmlFor="plugin_file_input">Picture</label>
                    <input
                        id="plugin_file_input"
                        type="file"
                        className="input"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ marginTop: "0.75rem", maxWidth: "180px" }}
                        />
                    )}
                    <br />
                    {error && <p className="subtitle">{error}</p>}
                    <button className="btn" type="submit" disabled={submitting}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg>
                        {submitting ? "Creating..." : "Create Plugin"}
                    </button>
                </form>
            </section>
        </>
    );
}