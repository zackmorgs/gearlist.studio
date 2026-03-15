import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!displayName.trim()) {
            setError("Plugin name is required.");
            return;
        }
        setError("");
        setSubmitting(true);
        try {
            const slug = slugify(displayName);
            const plugin = {
                slug: { value: slug },
                displayName: displayName.trim(),
                description,
                pluginType,
                amazonID: "",
                imageUrl: "",
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
                    <textarea
                        className="input"
                        placeholder="Description..."
                        style={{ height: "8rem" }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
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