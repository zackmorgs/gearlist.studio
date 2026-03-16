import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCabBySlug } from "../../../services/cabService";

export default function CabPage() {
    const { slug } = useParams();
    const [cab, setCab] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
                {cab.description
                    ? <div dangerouslySetInnerHTML={{ __html: cab.description }} />
                    : <p>No description available.</p>
                }
            </section>
            <section className="panel">
                <Link to="/equipment/cabs" className="btn">← Back to Cabs</Link>
            </section>
        </>
    );
}
