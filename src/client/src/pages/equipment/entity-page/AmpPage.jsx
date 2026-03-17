import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { getAmpBySlug } from "../../../services/ampService";

export default function AmpPage() {
    const { slug } = useParams();
    const [amp, setAmp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandDescription, setExpandDescription] = useState(false);

    useEffect(() => {
        async function fetchAmp() {
            try {
                const data = await getAmpBySlug(slug);
                setAmp(data);
            } catch (err) {
                setError("Amp not found.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchAmp();
    }, [slug]);

    if (loading) return <section className="panel"><p>Loading...</p></section>;
    if (error) return <section className="panel"><p>{error}</p></section>;

    const hasDescription = Boolean(amp?.description?.trim());
    const safeDescriptionHtml = hasDescription ? DOMPurify.sanitize(amp.description) : "";

    return (
        <>
            <header className="panel text-center">
                {amp.imageUrl && (
                    <img src={amp.imageUrl} alt={amp.displayName} style={{ maxWidth: "300px", marginBottom: "1rem" }} />
                )}
                <h1>{amp.displayName}</h1>
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
                <Link to="/equipment/amps" className="btn">← Back to Amps</Link>
            </section>
        </>
    );
}