import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getPlugins } from "../../services/pluginService";


export default function Plugins() {
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        async function fetchPlugins() {
            try {
                const data = await getPlugins();
                setPlugins(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchPlugins();
    }, []);

    return (
        <>
            <header className="panel text-center">
                <h1>Plugins</h1>
            </header>
            {plugins.length > 0 ? (
                <section className="panel">
                    <ul className="plugin-list">
                        {plugins.map((plugin) => (
                            <li className="plugin-card" key={plugin.id}>
                                <Link className="plugin-link" to={`/equipment/plugins/${plugin.slug.value}`}>
                                    {plugin.imageUrl ? (
                                        <img className="plugin-photo" src={plugin.imageUrl} alt={plugin.displayName || plugin.name} />
                                    ) : (
                                        <span>{plugin.displayName || plugin.name}</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <br />
                    <Link to="/equipment/plugins/new" className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg>
                        <span>Add New Plugin</span>
                    </Link>
                </section>
            ) : (
                <section className="panel">
                    <p>No plugins found. Be the first to add one!</p>
                    <Link to="/equipment/plugins/new" className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg>
                        <span>Add New Plugin</span>
                    </Link>
                </section>
            )}
        </>
    );
}