import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getInstruments } from "./../../services/instrumentService";
import { getAmps } from "./../../services/ampService";
import { getCabs } from "./../../services/cabService";
import { getPedals } from "./../../services/pedalService";
import { getPlugins } from "./../../services/pluginService";

export default function Equipment() {
    const [amps, setAmps] = useState([]);
    const [cabs, setCabs] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [pedals, setPedals] = useState([]);
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setAmps(await getAmps());
                setCabs(await getCabs());
                setPedals(await getPedals());
                setPlugins(await getPlugins());
                setInstruments(await getInstruments());
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <header>
                <div className="container">
                    <div className="panel text-center">
                        <h1>Equipment</h1>
                        <p>Here you can find all the gear used by your favorite artists, and add your own!</p>

                    </div>
                </div>
            </header>
            <section id="instruments">
                <div className="container">
                    <div className="panel">
                        <h2>Instruments <span className="top-10"><span className="top-10-bracket">(</span>Top 10<span className="top-10-bracket">)</span></span></h2>
                        <ul className="instrument-list">
                            {instruments.length === 0 ? (<li>No instruments found.</li>) : (
                                instruments.map(instrument => <li key={instrument.id} className="instrument-card">
                                    <Link to={`/equipment/instruments/${instrument.slug.value}`} className="instrument-link">
                                        <img src={instrument.imageUrl} alt={instrument.displayName} className="instrument-photo" />
                                        <div className="overlay">
                                            {instrument.displayName}
                                        </div>
                                    </Link>

                                </li>)
                            )}
                        </ul>
                        <Link to="/equipment/instruments/" className="btn btn-primary">
                            <span>View All Instruments</span> <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m576-288-51-51 105-105H192v-72h438L525-621l51-51 192 192-192 192Z" /></svg>
                        </Link>
                    </div>
                </div>
            </section>
            <section id="amps">
                <div className="container">
                    <div className="panel">
                        <h2>Amps <span className="top-10"><span className="top-10-bracket">(</span>Top 10<span className="top-10-bracket">)</span></span></h2>
                        <ul className="amp-list">
                            {amps.length === 0 ? (<li>No amps found.</li>) : (
                                amps.map(amp => <li key={amp.id} className="amp-card">
                                    <Link to={`/equipment/amps/${amp.slug.value}`} className="amp-link">
                                        <img className="amp-photo" src={amp.imageUrl} alt={amp.displayName} />
                                        <div className="overlay">

                                            {amp.displayName}
                                        </div>
                                    </Link>
                                </li>)
                            )}
                        </ul>
                        <Link to="/equipment/amps/" className="btn btn-primary">
                            <span>View All Amps</span> <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m576-288-51-51 105-105H192v-72h438L525-621l51-51 192 192-192 192Z" /></svg>
                        </Link>
                    </div>
                </div>

            </section>
            <section id="cabs">
                <div className="container">
                    <div className="panel">
                        <h2>Cabs <span className="top-10"><span className="top-10-bracket">(</span>Top 10<span className="top-10-bracket">)</span></span></h2>
                        <ul className="cab-list">
                            {cabs.length === 0 ? (<li>No cabs found.</li>) : (
                                cabs.map(cab => <li key={cab.id} className="cab-card">{
                                    cab.imageUrl ? (
                                        <Link to={`/equipment/cabs/${cab.slug.value}`} className="cab-picture">
                                            <img className="cab-photo" src={cab.imageUrl} alt={cab.displayName} />
                                            <div className="overlay">
                                                {cab.displayName}
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="no-image">
                                            {cab.displayName}
                                        </div>
                                    )
                                }</li>)
                            )}
                        </ul >
                        <Link to="/equipment/cabs/" className="btn btn-primary">
                            <span>View All Cabs</span> <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m576-288-51-51 105-105H192v-72h438L525-621l51-51 192 192-192 192Z" /></svg>
                        </Link>
                    </div>
                </div>
            </section >
            <section id="pedals" className="panel">
                <h2>Pedals <span className="top-10"><span className="top-10-bracket">(</span>Top 10<span className="top-10-bracket">)</span></span></h2>
                <span></span>                <ul>
                    {pedals.length === 0 ? (<li>No pedals found.</li>) : (
                        pedals.map(pedal => <li key={pedal.id}>{pedal.displayName}</li>)
                    )}
                </ul>
                <Link to="/equipment/pedals/" className="btn btn-primary">
                    <span>View All Pedals</span> <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m576-288-51-51 105-105H192v-72h438L525-621l51-51 192 192-192 192Z" /></svg>
                </Link>
            </section>
            <section id="plugins" className="panel">
                <h2>Plugins <span className="top-10"><span className="top-10-bracket">(</span>Top 10<span className="top-10-bracket">)</span></span></h2>
                <ul>
                    {plugins.length === 0 ? (<li>No plugins found.</li>) : (
                        plugins.map(plugin => <li key={plugin.id}>{plugin.displayName}</li>)
                    )}
                </ul>
                <Link to="/equipment/plugins/" className="btn btn-primary">
                    <span>View All Plugins</span> <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m576-288-51-51 105-105H192v-72h438L525-621l51-51 192 192-192 192Z" /></svg>
                </Link>
            </section>
        </>

    );
}