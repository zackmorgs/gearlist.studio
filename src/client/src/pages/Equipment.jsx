import React, { useEffect, useState } from "react";

import { getAmps } from "../services/ampService";
import { getPedals } from "../services/pedalService";
import { getPlugins } from "../services/pluginService";

export default function Equipment() {
    const [amps, setAmps] = useState([]);
    const [pedals, setPedals] = useState([]);
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setAmps(await getAmps());
                setPedals(await getPedals());
                setPlugins(await getPlugins());
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
            <section id="amps" className="panel">
                <h2>Amps</h2>
                <ul>
                    {amps.length === 0 ? (<li>No amps found.</li>) : (
                        amps.map(amp => <li key={amp.id}>{amp.name}</li>)
                    )}
                </ul>
            </section>
            <section id="pedals" className="panel">
                <h2>Pedals</h2>
                <ul>
                    {pedals.length === 0 ? (<li>No pedals found.</li>) : (
                        pedals.map(pedal => <li key={pedal.id}>{pedal.name}</li>)
                    )}
                </ul>
            </section>
            <section id="plugins" className="panel">
                <h2>Plugins</h2>
                <ul>
                    {plugins.length === 0 ? (<li>No plugins found.</li>) : (
                        plugins.map(plugin => <li key={plugin.id}>{plugin.name}</li>)
                    )}
                </ul>
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