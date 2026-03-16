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
            <header className="panel text-center">
                <h1>Pedals</h1>
            </header>
            {pedals.length > 0 ? (
                <section className="panel">
                    <ul className="pedal-list">
                        {pedals.map(pedal => (
                            <li className="pedal-item" key={pedal.id}>
                                <Link className="pedal-picture" to={`/pedals/${pedal.slug.value}`}>
                                    {pedal.displayName || pedal.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <br />
                    <Link to="/equipment/pedals/new" className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z"></path></svg>
                        <span>Add New Pedal</span>
                    </Link>
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