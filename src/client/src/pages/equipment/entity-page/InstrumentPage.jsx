import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { getInstrumentBySlug } from "../../../services/instrumentService";

export default function InstrumentPage() {
    const { slug } = useParams();
    const [instrument, setInstrument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandDescription, setExpandDescription] = useState(false);

    useEffect(() => {
        async function fetchInstrument() {
            try {
                const data = await getInstrumentBySlug(slug);
                setInstrument(data);
            } catch (err) {
                setError("Instrument not found.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchInstrument();
    }, [slug]);

    if (loading) return <section className="panel"><p>Loading...</p></section>;
    if (error) return <section className="panel"><p>{error}</p></section>;

    const hasDescription = Boolean(instrument?.description?.trim());
    const safeDescriptionHtml = hasDescription ? DOMPurify.sanitize(instrument.description) : "";

    return (
        <>
            <header className="panel text-center">
                {instrument.imageUrl && (
                    <img src={instrument.imageUrl} alt={instrument.displayName} style={{ maxWidth: "300px", marginBottom: "1rem" }} />
                )}
                <h1>{instrument.displayName}</h1>
                <Link to={`/equipment/instruments/${slug}/edit`} className="btn">Edit</Link>
            </header>
            <section className="panel">
                <h2>Description</h2>
                <div className={`description-toggle${expandDescription ? " expanded" : ""}`}>
                    {hasDescription ? (
                        <>
                            <div dangerouslySetInnerHTML={{ __html: safeDescriptionHtml }} />
                            {!expandDescription && (
                                <div id="toggle_overlay">
                                    <div id="toggle_toggle" onClick={() => setExpandDescription(true)}>
                                        <b>Expand</b>
                                        <br />
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M480-333 240-573l51-51 189 189 189-189 51 51-240 240Z" /></svg>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <p>No description available.</p>
                    )}
                </div>
            </section>
            <section className="panel">
                <Link to="/equipment/instruments" className="btn">← Back to Instruments</Link>
            </section>
        </>
    );
}