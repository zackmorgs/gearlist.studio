import React, { useEffect, useState } from "react";
import { getCabs } from "../../services/cabService";
import { Link } from "react-router-dom";

export default function Cabs() {
    const [cabs, setCabs] = useState([]);

    useEffect(() => {
        async function fetchCabs() {
            try {
                const data = await getCabs();
                setCabs(data);
            }
            catch (err) {
                console.error(err);
            }
        }

        fetchCabs();
    }, []);

    return (
        <>
            <header className="panel text-center">
                <h1>Cabs</h1>
            </header>
            <section className="panel">
                <p>Here you can find all the cabs used by your favorite artists, and add your own!</p>
            </section>
            <section id="cabs" className="panel">
                <h2>Cabs <span className="top-10"><span className="top-10-bracket">(</span>Top 10<span className="top-10-bracket">)</span></span></h2>
                <br />
                {cabs.length === 0 ? (<b>No cabs found.</b>) : (
                    <ul className="cab-list">
                        {cabs.map((cab) => <li key={cab.id}>
                            <Link className="cab-link" to={`/equipment/cabs/${cab.slug.value}`}>
                                {cab.imageUrl ? (
                                    <img className="cab-photo" src={cab.imageUrl} alt={cab.name} />
                                ) : (
                                    <span>{cab.name}</span>
                                )}
                            </Link>
                        </li>
                        )}
                    </ul>
                )}
                <br />
                <br />
                <Link to="/equipment/cabs/new" className="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg><span>Add a Cab</span>
                </Link>
            </section>
        </>
    );
}