import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getPedals } from "../../services/pedalService";


export default function Pedals() {
    const [pedals, setPedals] = useState([]);

    useEffect(() => {
        const fetchPedals = async () => {
            const data = await getPedals();
            setPedals(data);
        };
        fetchPedals();
    }, []);

    return (
        <>
            <header>
                <div className="container">
                    <div className="panel text-center">
                        <h1>Pedals</h1>
                    </div>
                </div>
            </header>
            {pedals.length > 0 ? (
                <section>
                    <div className="container">
                        <div className="panel">
                            <ul className="pedal-list">
                                {pedals.map(pedal => (
                                    <li className="pedal-card" key={pedal.id}>
                                        <Link className="pedal-picture" to={`/equipment/pedals/${pedal.slug.value}`}>
                                            <img className="pedal-photo" src={pedal.imageUrl} alt={pedal.displayName} />
                                            <div className="overlay">
                                                {pedal.displayName}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <br />
                            <Link to="/equipment/pedals/new" className="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z"></path></svg>
                                <span>Add New Pedal</span>
                            </Link>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="panel">
                    <p>No pedals found. Be the first to add one!</p>
                    <Link to="/equipment/pedals/new" className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z"></path></svg>
                        <span>Add New Pedal</span>
                    </Link>
                </section>
            )}
        </>
    );
}