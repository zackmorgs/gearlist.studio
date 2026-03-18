import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInstruments } from "../../services/instrumentService";

export default function Instruments() {
    const [instruments, setInstruments] = useState([]);

    useEffect(() => {
        async function fetchInstruments() {
            try {
                await setInstruments(await getInstruments());
                console.log(await getInstruments());
            } catch (err) {
                console.error(err);
            }
        }
        fetchInstruments();
    }, []);


    return (
        <>
            <header>
                <div className="container">
                    <div className="panel text-center">
                        <h1>Instruments</h1>
                    </div>
                </div>
            </header>
            {instruments.length === 0 ? (
                <section >
                    <div className="container">
                        <div className="panel">
                            <div id="no-results-found">
                                <p>No instruments found.</p>
                                <Link to="/equipment/instruments/new" className="btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg> <span>Add an Instrument</span>
                                </Link>

                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section>
                    <div className="container">
                        <div className="panel">
                            <ul className="instrument-list">
                                {instruments.map(instrument => (
                                    <li className="instrument-card" key={instrument.id}>
                                        <Link className="instrument-link" to={`/equipment/instruments/${instrument.slug.value}`}>
                                            {instrument.imageUrl ? (
                                                <img className="instrument-photo" src={instrument.imageUrl} alt={instrument.name} />
                                            ) : (
                                                <svg className="instrument-placeholder" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M162-186q-42-42-42-102t42-102q42-42 102-42 20 0 38 5.5t34 14.5v-309l456-95v458q0 60-42 102t-102 42q-60 0-102-42t-42-102q0-60 42-102t102-42q20 0 38 5.5t34 14.5v-172l-312 77v289q0 60-42 102t-102 42q-60 0-102-42Z" /></svg>
                                            )}
                                            <h3 className="overlay">
                                                {instrument.displayName || instrument.name}
                                            </h3>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <br />
                            <Link to="/equipment/instruments/new" className="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg><span>Add an Instrument</span>
                            </Link>
                        </div>
                    </div>
                </section>
            )
            }

        </>
    );
}