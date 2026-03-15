import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getInstruments } from "./../../services/instrumentService";
import { getAmps } from "./../../services/ampService";
import { getPedals } from "./../../services/pedalService";
import { getPlugins } from "./../../services/pluginService";

export default function Equipment() {
    const [amps, setAmps] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [pedals, setPedals] = useState([]);
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setAmps(await getAmps());
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
            <header className="panel text-center">
                <h1>Equipment</h1>
            </header>
            <section className="panel">
                <p>Here you can find all the gear used by your favorite artists, and add your own!</p>

            </section>
            <section id="instruments" className="panel">
                <h2>Instruments <span className="top-10"><span className="top-10-bracket">(</span>Top 10<span className="top-10-bracket">)</span></span></h2>
                <ul>
                    {instruments.length === 0 ? (<li>No instruments found.</li>) : (
                        instruments.map(instrument => <li key={instrument.id}>{instrument.displayName || instrument.name}</li>)
                    )}
                </ul>
                <Link to="/equipment/instruments/" className="btn btn-primary">
                    <span>View All Instruments</span> <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m576-288-51-51 105-105H192v-72h438L525-621l51-51 192 192-192 192Z" /></svg>
                </Link>
            </section>
            <section id="amps" className="panel">
                <h2>Amps <span className="top-10"><span className="top-10-bracket">(</span>Top 10<span className="top-10-bracket">)</span></span></h2>
                <ul>
                    {amps.length === 0 ? (<li>No amps found.</li>) : (
                        amps.map(amp => <li key={amp.id}>{amp.name}</li>)
                    )}
                </ul>
                <Link to="/equipment/amps/" className="btn btn-primary">
                    <span>View All Amps</span> <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m576-288-51-51 105-105H192v-72h438L525-621l51-51 192 192-192 192Z" /></svg>
                </Link>

            </section>
            <section id="pedals" className="panel">
                <h2>Pedals <span className="top-10"><span className="top-10-bracket">(</span>Top 10<span className="top-10-bracket">)</span></span></h2>
                <span></span>                <ul>
                    {pedals.length === 0 ? (<li>No pedals found.</li>) : (
                        pedals.map(pedal => <li key={pedal.id}>{pedal.name}</li>)
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
                        plugins.map(plugin => <li key={plugin.id}>{plugin.name}</li>)
                    )}
                </ul>
                <Link to="/equipment/plugins/" className="btn btn-primary">
                    <span>View All Plugins</span> <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m576-288-51-51 105-105H192v-72h438L525-621l51-51 192 192-192 192Z" /></svg>
                </Link>
            </section>
            <section id="plugins" className="panel">
                {plugins.length > 0 && (
                    <>
                        <h2>Plugins</h2>
                        <ul>
                            {plugins.map(plugin => <li key={plugin.id}>{plugin.name}</li>)}
                        </ul>
                    </>
                )}
            </section>


        </>

    );
}