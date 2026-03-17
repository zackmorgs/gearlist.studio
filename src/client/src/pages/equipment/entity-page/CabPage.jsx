import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { getCabBySlug } from "../../../services/cabService";

export default function CabPage() {
    const { slug } = useParams();
    const [cab, setCab] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandDescription, setExpandDescription] = useState(false);

    useEffect(() => {
        async function fetchCab() {
            try {
                const data = await getCabBySlug(slug);
                setCab(data);
            } catch (err) {
                setError("Cab not found.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchCab();
    }, [slug]);

    if (loading) return <section className="panel"><p>Loading...</p></section>;
    if (error) return <section className="panel"><p>{error}</p></section>;

    const hasDescription = Boolean(cab?.description?.trim());
    const safeDescriptionHtml = hasDescription ? DOMPurify.sanitize(cab.description) : "";

    return (
        <>
            <header className="panel text-center">
                {cab.imageUrl && (
                    <img src={cab.imageUrl} alt={cab.displayName} style={{ maxWidth: "300px", marginBottom: "1rem" }} />
                )}
                <h1>{cab.displayName}</h1>
                {cab.isBassCab && <span className="badge">Bass Cab</span>}
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
                <Link to="/equipment/cabs" className="btn">← Back to Cabs</Link>
            </section>
        </>
    );
}
