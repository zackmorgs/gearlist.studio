import React, { useEffect, useState } from "react";
import { getAmps } from "../../services/ampService";
import { Link } from "react-router-dom";

export default function Amps() {
    const [amps, setAmps] = useState([]);

    useEffect(() => {
        async function fetchAmps() {
            try {
                const data = await getAmps();
                setAmps(data);
            }
            catch (err) {
                console.error(err);
            }
        }

        fetchAmps();
    }
        , []);

    return (
        <>
            <header>
                <div className="container">
                    <div className="panel text-center">
                        <h1>Amps</h1>
                        <p>Here you can find all the amps used by your favorite artists, and add your own!</p>
                    </div>
                </div>
            </header>
            <section id="amps">
                <div className="container">
                    <div className="panel">
                        <h2>Amps <span className="top-10"><span className="top-10-bracket">(</span>Top 10<span className="top-10-bracket">)</span></span></h2>
                        <br />
                        {amps.length === 0 ? (<b>No amps found.</b>) : (
                            <ul className="amp-list">
                                {amps.map((amp) => <li key={amp.id} className="amp-item">
                                    <Link className="amp-link" to={`/equipment/amps/${amp.slug.value}`}>
                                        {amp.imageUrl ? (
                                            <>
                                                <img className="amp-photo" src={amp.imageUrl} alt={amp.displayName} />
                                                <div className="overlay">
                                                    <span>{amp.displayName}</span>
                                                </div>
                                            </>
                                        ) : (<span>{amp.displayName}</span>)}
                                    </Link>
                                </li>
                                )}
                            </ul>
                        )}
                        <br />
                        <br />
                        <Link to="/equipment/amps/new" className="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg><span>Add an Amp</span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}