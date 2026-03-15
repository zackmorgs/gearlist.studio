import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createAmp } from "../../../services/ampService";

const AMP_TYPES = ["Tube", "Solid-State", "Modeling", "Hybrid"];

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
}

export default function NewAmp() {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [ampType, setAmpType] = useState("");
    const [isCombo, setIsCombo] = useState(false);
    const [isBassAmp, setIsBassAmp] = useState(false);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!displayName.trim()) {
            setError("Amp name is required.");
            return;
        }
        setError("");
        setSubmitting(true);
        try {
            const slug = slugify(displayName);
            const amp = {
                slug: { value: slug },
                displayName: displayName.trim(),
                description,
                ampType,
                isCombo,
                isBassAmp,
                amazonID: "",
                imageUrl: "",
                price: 0,
            };
            const created = await createAmp(amp);
            navigate(`/equipment/amps/${created.slug?.value ?? slug}`);
        } catch (err) {
            setError("Failed to create amp. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <header className="panel text-center">
                <h1>New Amp</h1>
            </header>
            <section className="panel">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="input"
                        placeholder="Amp Name..."
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                    <br />
                    <select
                        className="input input-select"
                        value={ampType}
                        onChange={(e) => setAmpType(e.target.value)}
                    >
                        <option value="">Select Amp Type...</option>
                        {AMP_TYPES.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    <br />
                    <label className="input-checkbox">
                        <input type="checkbox" checked={isCombo} onChange={(e) => setIsCombo(e.target.checked)} />
                        Combo Amp
                    </label>
                    <br />
                    <label className="input-checkbox">
                        <input type="checkbox" checked={isBassAmp} onChange={(e) => setIsBassAmp(e.target.checked)} />
                        Bass Amp
                    </label>
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
                        {submitting ? "Creating..." : "Create Amp"}
                    </button>
                </form>
            </section>
        </>
    );
}