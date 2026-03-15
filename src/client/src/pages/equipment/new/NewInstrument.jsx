import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createInstrument } from "../../../services/instrumentService";

const INSTRUMENT_TYPES = ["Guitar", "Bass", "Drums", "Keyboard", "Synthesizer", "Other"];

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
}

export default function NewInstrument() {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [instrumentType, setInstrumentType] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!displayName.trim()) {
            setError("Instrument name is required.");
            return;
        }
        setError("");
        setSubmitting(true);
        try {
            const slug = slugify(displayName);
            const instrument = {
                slug: { value: slug },
                displayName: displayName.trim(),
                description,
                instrumentType,
                amazonID: "",
                imageUrl: "",
                price: 0,
            };
            const created = await createInstrument(instrument);
            navigate(`/equipment/instruments/${created.slug?.value ?? slug}`);
        } catch (err) {
            setError("Failed to create instrument. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <header className="panel text-center">
                <h1>New Instrument</h1>
            </header>
            <section className="panel">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="input"
                        placeholder="Instrument Name..."
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                    <br />
                    <select
                        className="input input-select"
                        value={instrumentType}
                        onChange={(e) => setInstrumentType(e.target.value)}
                    >
                        <option value="">Select Instrument Type...</option>
                        {INSTRUMENT_TYPES.map(t => (
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
                        {submitting ? "Creating..." : "Create Instrument"}
                    </button>
                </form>
            </section>
        </>
    );
}