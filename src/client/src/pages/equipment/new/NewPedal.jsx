import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

import { createPedal } from "../../../services/pedalService";

const PEDAL_TYPES = [
    "Overdrive", "Distortion", "Fuzz", "Boost / Clean Boost", "Treble Boost",
    "Preamp", "Amp-in-a-box", "Chorus", "Flanger", "Phaser", "Tremolo",
    "Vibrato", "Rotary Speaker / Leslie", "Uni-Vibe", "Ring Modulator",
    "Delay", "Reverb", "Echo / Tape Echo", "Multi-delay",
    "Octave", "Pitch Shifter", "Harmonizer", "Whammy / Expression Pitch",
    "Wah", "Auto Wah", "Envelope Filter",
    "Compressor", "Limiter", "Noise Gate / Noise Suppressor",
    "EQ (Graphic)", "EQ (Parametric)", "Cab Simulator", "IR Loader",
    "Volume Pedal", "Loop Switcher", "A/B Switch", "Buffer",
    "Amp Modeler", "Looper", "Multi-FX Processor",
];

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
}

export default function NewPedal() {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [pedalType, setPedalType] = useState("");
    const [isBassPedal, setIsBassPedal] = useState(false);
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
            setError("Pedal name is required.");
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
            const pedal = {
                slug: { value: slug },
                displayName: displayName.trim(),
                description,
                pedalType,
                isBassPedal,
                amazonID: "",
                imageUrl,
                price: 0,
            };
            const created = await createPedal(pedal);
            navigate(`/equipment/pedals/${created.slug?.value ?? slug}`);
        } catch (err) {
            setError("Failed to create pedal. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <header className="panel text-center">
                <h1>New Pedal</h1>
            </header>
            <section className="panel">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="input"
                        placeholder="Pedal Name..."
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                    <br />
                    <select
                        className="input input-select"
                        value={pedalType}
                        onChange={(e) => setPedalType(e.target.value)}
                    >
                        <option value="">Select Pedal Type...</option>
                        {PEDAL_TYPES.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    <br />
                    <label className="input-checkbox">
                        <input type="checkbox" checked={isBassPedal} onChange={(e) => setIsBassPedal(e.target.checked)} />
                        Bass Pedal
                    </label>
                    <br />
                    <Editor
                        apiKey="scgdo10tw7b74zk4lfomtw3eirvn8xw863dvg77qifj7ctqk"
                        id="pedal_description_input"
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
                    <label className="label" htmlFor="pedal_file_input">Picture</label>
                    <input
                        id="pedal_file_input"
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
                        {submitting ? "Creating..." : "Create Pedal"}
                    </button>
                </form>
            </section>
        </>
    );
}