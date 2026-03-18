import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getBands, getFourRandomBands } from "../services/bandService";
import { getArtists, getFourRandomArtists } from "../services/artistService";
import { getInstruments, getFourRandomInstruments } from "../services/instrumentService";
import { getAmps, getFourRandomAmps } from "../services/ampService";
import { getPedals, getFourRandomPedals } from "../services/pedalService";
import { getPlugins, getFourRandomPlugins } from "../services/pluginService";

const artist_example_list = [
    {
        name: "James Hetfield",
        picture: "/assets/img/james-hetfield.webp"
    },
    {
        name: "Kevin Parker",
        picture: "/assets/img/kevin-parker.jpg"
    },
    {
        name: "Kurt Cobain",
        picture: "/assets/img/kurt-cobain.jpg"
    },
    {
        name: "Justin Chancellor",
        picture: "/assets/img/justin-chancellor.jpeg"
    }
];

const instrument_example_list = [
    {
        name: "Fender Stratocaster",
        picture: "/assets/img/stratocaster.webp"
    },
    {
        name: "Gibson Les Paul",
        picture: "/assets/img/les-paul.webp"
    },
    {
        name: "Höfner 500/1 Ignition",
        picture: "/assets/img/hofner-500-1-ignition-m.webp"
    },
    {
        name: "Moog Sub 37",
        picture: "/assets/img/moog-sub-37.webp"
    }
];

const amp_example_list = [
    {
        name: "Marshall JVM410H",
        picture: "/assets/img/marshall-jvm410h-m.webp"
    },
    {
        name: "Vox AC30",
        picture: "/assets/img/vox-ac30-guitar-combo-amp-m.webp"
    },
    {
        name: "Fender Twin Reverb",
        picture: "/assets/img/fender-65-twin-reverb-m.webp"
    },
    {
        name: "Mesa Boogie Dual Rectifier",
        picture: "/assets/img/mesa-boogie-dual-rectifier-100-watt-tube-head-m.webp"
    }
];

const pedal_example_list = [
    {
        name: "Boss DS-1 Distortion",
        picture: "/assets/img/boss-ds-1-distortion-m.webp"
    },
    {
        name: "Pro Co RAT",
        picture: "/assets/img/pro-co-rat-m.webp"
    },
    {
        name: "Strymon blueSky Reverberator",
        picture: "/assets/img/strymon-bluesky-reverberator-m.webp"
    },
    {
        name: "Strymon TimeLine",
        picture: "/assets/img/strymon-timeline-xl.webp"
    }
];
const plugin_example_list = [
    {
        name: "Pro-Q 3",
        picture: "/assets/img/fabfilter-pro-q-3-equalizer-plugin-m.webp"
    },
    {
        name: "Neural Amp Modeler",
        picture: "/assets/img/neural-amp-modeler-xl.webp"
    },
    {
        name: "Universal Audio UAD 1176 Classic FET Compressor",
        picture: "/assets/img/universal-audio-uad-1176-classic-fet-compressor-xl.webp"
    },

    {
        name: "Waves SSL E-Channel",
        picture: "/assets/img/waves-ssl-e-channel-m.webp"
    }
];


export default function Home() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchMessage, setSearchMessage] = useState("");

    const [band_list, set_band_list] = useState([]);
    const [artist_list, set_artist_list] = useState([]);
    const [instrument_list, set_instrument_list] = useState([]);
    const [amp_list, set_amp_list] = useState([]);
    const [pedal_list, set_pedal_list] = useState([]);
    const [plugin_list, set_plugin_list] = useState([]);

    const normalizedSearchTerm = useMemo(() => searchTerm.trim().toLowerCase(), [searchTerm]);

    function slugify(value) {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
    }

    function getSlug(entity) {
        if (!entity) return "";

        if (typeof entity.slug === "string") {
            return entity.slug;
        }

        if (entity.slug && typeof entity.slug.value === "string") {
            return entity.slug.value;
        }

        return slugify(entity.displayName || entity.name || "");
    }

    function getLabel(entity) {
        return (entity?.displayName || entity?.name || "").toLowerCase();
    }

    function findBestMatch(items, term) {
        const exact = items.find((item) => getLabel(item) === term);
        if (exact) return exact;

        return items.find((item) => getLabel(item).includes(term)) || null;
    }

    async function handleSearchSubmit(event) {
        event.preventDefault();

        if (!normalizedSearchTerm) {
            setSearchMessage("");
            return;
        }

        try {
            const [bands, artists, instruments, amps, pedals, plugins] = await Promise.all([
                getBands(),
                getArtists(),
                getInstruments(),
                getAmps(),
                getPedals(),
                getPlugins()
            ]);
            const bandsMatch = findBestMatch(bands, normalizedSearchTerm);
            if (bandsMatch) {
                setSearchMessage("");
                navigate(`/bands/${getSlug(bandsMatch)}`);
                return;
            }

            const artistsMatch = findBestMatch(artists, normalizedSearchTerm);
            if (artistsMatch) {
                setSearchMessage("");
                navigate(`/artists/${getSlug(artistsMatch)}`);
                return;
            }

            const instrumentsMatch = findBestMatch(instruments, normalizedSearchTerm);
            if (instrumentsMatch) {
                setSearchMessage("");
                navigate(`/equipment/instruments/${getSlug(instrumentsMatch)}`);
                return;
            }

            const ampsMatch = findBestMatch(amps, normalizedSearchTerm);
            if (ampsMatch) {
                setSearchMessage("");
                navigate(`/equipment/amps/${getSlug(ampsMatch)}`);
                return;
            }

            const pedalsMatch = findBestMatch(pedals, normalizedSearchTerm);
            if (pedalsMatch) {
                setSearchMessage("");
                navigate(`/equipment/pedals/${getSlug(pedalsMatch)}`);
                return;
            }

            const pluginsMatch = findBestMatch(plugins, normalizedSearchTerm);
            if (pluginsMatch) {
                setSearchMessage("");
                navigate(`/equipment/plugins/${getSlug(pluginsMatch)}`);
                return;
            }

            setSearchMessage("No results found. Try a different search term.");
        } catch (err) {
            setSearchMessage("Search failed. Please try again.");
            console.error(err);
        }
    }

    function getBandLabel(band) {
        return band?.displayName || band?.name || "Unknown Band";
    }

    function getBandImage(band) {
        return band?.imageUrl || band?.picture || "/placeholder-artist.png";
    }

    useEffect(() => {
        async function fetchData() {
            try {
                set_band_list(await getFourRandomBands());
                set_artist_list(await getFourRandomArtists());
                set_instrument_list(await getFourRandomInstruments());
                set_amp_list(await getFourRandomAmps());
                set_pedal_list(await getFourRandomPedals());
                set_plugin_list(await getFourRandomPlugins());
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <header id="header_home">
                <div className="container">
                    <div className="panel text-center">
                        <h1>Discover the Gear Behind the Sound</h1>
                        <p>The ultimate database of guitars, amps, pedals, plugins, and studio equipment used by musicians around the world.</p>

                        <form className="input-group" onSubmit={handleSearchSubmit}>
                            <svg className="icon-search" xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 -960 960 960" width="1rem" fill="#111111"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                            <input
                                id="search_input"
                                type="search"
                                placeholder="Search artists, instruments, amps, pedals, and plugins..."
                                className="input input-search"
                                value={searchTerm}
                                onChange={(event) => {
                                    setSearchTerm(event.target.value);
                                    if (searchMessage) {
                                        setSearchMessage("");
                                    }
                                }}
                            />

                        </form>
                        {searchMessage && <div id="no-search-results">
                            <p>{searchMessage}</p>
                            <Link to={`/create/${searchTerm}`} className="btn">
                                <span>Add "{searchTerm}"</span>
                            </Link>
                        </div>}

                        <br />
                        {/* <Link id="search_Link" className="btn">
                    <span>Search</span>
                    <img src="/assets/svg/icon-search.svg" alt="Search Icon" className="btn-icon" />
                </Link> */}
                    </div>
                </div>
            </header>
            <section id="cta_bands" className="section">
                <div className="container">
                    <div className="panel text-center">
                        <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M0-240v-59q0-51 45-80t123-29q15 0 30 1.5t30 4.5q-17 20-26.5 45t-9.5 50.56V-240H0Zm240 0v-61q0-27.86 14.5-50.93T293-387q44-22 91-33.5t95.53-11.5Q529-432 576-420.5t91 33.5q24 12 38.5 35.07T720-301v61H240Zm528 0v-67.37q0-26.95-9.5-50.79T732-402q17-3 31.5-4.5T792-408q78 0 123 29t45 80v59H768Zm-454-72h332q-7-17-59.5-32.5T480-360q-54 0-106.5 15.5T314-312ZM167.79-456Q138-456 117-477.03q-21-21.02-21-50.55Q96-558 117.03-579q21.02-21 50.55-21Q198-600 219-579.24t21 51.45Q240-498 219.24-477t-51.45 21Zm624 0Q762-456 741-477.03q-21-21.02-21-50.55Q720-558 741.03-579q21.02-21 50.55-21Q822-600 843-579.24t21 51.45Q864-498 843.24-477t-51.45 21ZM479.5-480q-49.5 0-84.5-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85.5q0 49.5-35 84.5t-85.5 35Zm.5-72q20.4 0 34.2-13.8Q528-579.6 528-600q0-20.4-13.8-34.2Q500.4-648 480-648q-20.4 0-34.2 13.8Q432-620.4 432-600q0 20.4 13.8 34.2Q459.6-552 480-552Zm0 240Zm0-288Z" /></svg>
                        <h2>Bands</h2>
                        <hr className="rule-sm" />
                        <Link to="/bands" className="btn">
                            <span>Explore Bands</span> <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" />
                        </Link>
                        <p className="subtitle">Discover the gear used by your favorite bands.</p>
                        {band_list && (<ul className="band-list">
                            {band_list.map((band, index) => (
                                <li key={index} className="band-card">
                                    <Link className="band-link" to="/bands">
                                        <img className="band-photo" src={getBandImage(band)} alt={getBandLabel(band)} />
                                        <div className="overlay">
                                            <h3>{getBandLabel(band)}</h3>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>)}
                    </div>
                </div>
            </section >
            <section id="cta_artists">
                <div className="container">
                    <div className="panel text-center">
                        <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M740-560h140v80h-80v220q0 42-29 71t-71 29q-42 0-71-29t-29-71q0-42 29-71t71-29q8 0 18 1.5t22 6.5v-208ZM120-160v-112q0-35 17.5-63t46.5-43q62-31 126-46.5T440-440q42 0 83.5 6.5T607-414q-20 12-36 29t-28 37q-26-6-51.5-9t-51.5-3q-57 0-112 14t-108 40q-9 5-14.5 14t-5.5 20v32h321q2 20 9.5 40t20.5 40H120Zm207-367q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm169.5-56.5Q520-607 520-640t-23.5-56.5Q473-720 440-720t-56.5 23.5Q360-673 360-640t23.5 56.5Q407-560 440-560t56.5-23.5ZM440-640Zm0 400Z" /></svg>
                        <h2>Artists</h2>
                        <hr className="rule-sm" />
                        <Link to="/artists" className="btn">
                            <span>Explore Artists</span> <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" />
                        </Link>
                        <p className="subtitle">Explore the gear via our curated artist profiles.</p>
                        <ul className="artist-list">
                            {artist_list.map((artist, index) => (
                                <li key={index} className="artist-card">
                                    <Link className="artist-link" to={`/artists/${getSlug(artist)}`}>
                                        <img className="artist-photo" src={artist.imageUrl || "/placeholder-artist.png"} alt={artist.displayName || artist.name} />
                                        <div className="overlay">
                                            <h3>{artist.displayName || artist.name}</h3>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section id="cta_instruments" >
                <div className="container">
                    <div className="panel text-center">
                        <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h130v-180h-10q-17 0-28.5-11.5T280-420v-340h-80v560Zm430 0h130v-560h-80v340q0 17-11.5 28.5T640-380h-10v180Zm-240 0h180v-180h-10q-17 0-28.5-11.5T520-420v-340h-80v340q0 17-11.5 28.5T400-380h-10v180Z" /></svg>
                        <h2>Instruments</h2>
                        <hr className="rule-sm" />

                        <Link to="/equipment/instruments" className="btn"><span>Explore Instruments</span> <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" /></Link>
                        <p className="subtitle">See a database of guitars, bass, keyboards and other instruments that artists use.</p>
                        <ul className="instrument-list">
                            {instrument_list.map((instrument, index) => (
                                <li key={index} className="instrument-card">
                                    <Link className="instrument-link" to={`/equipment/instruments/${getSlug(instrument)}`}>
                                        <img className="instrument-photo" src={instrument.imageUrl || instrument.picture || "/placeholder-artist.png"} alt={instrument.displayName || instrument.name} />
                                        <div className="overlay">
                                            <h3>{instrument.displayName || instrument.name}</h3>
                                        </div>
                                    </Link>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </section>


            <section id="cta_amps" >
                <div className="container">
                    <div className="panel text-center">
                        <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-360h640v-320H160v320Zm40 160q-17 0-28.5-11.5T160-240v-40q-33 0-56.5-23.5T80-360v-320q0-33 23.5-56.5T160-760h640q33 0 56.5 23.5T880-680v320q0 33-23.5 56.5T800-280v40q0 17-11.5 28.5T760-200q-17 0-28.5-11.5T720-240v-40H240v40q0 17-11.5 28.5T200-200Zm-40-160v-320 320Zm556.5-103.5Q740-487 740-520t-23.5-56.5Q693-600 660-600t-56.5 23.5Q580-553 580-520t23.5 56.5Q627-440 660-440t56.5-23.5ZM240-440h280v-160H240v160Z" /></svg>
                        <h2>Amps</h2>
                        <hr className="rule-sm" />

                        <Link to="/equipment/amps" className="btn"><span>Explore Amps</span> <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" /></Link>
                        <p className="subtitle">See a database of amplifiers that artists use.</p>
                        <ul className="amp-list">
                            {amp_list.map((amp, index) => (
                                <li key={index} className="amp-card">
                                    <Link className="amp-link" to={`/equipment/amps/${getSlug(amp)}`}>
                                        <img className="amp-photo" src={amp.imageUrl || amp.picture || "/placeholder-artist.png"} alt={amp.displayName || amp.name} />
                                        <div className="overlay">
                                            <h3>{amp.displayName || amp.name}</h3>
                                        </div>
                                    </Link>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </section>


            <section id="cta_pedals">
                <div className="container">
                    <div className="panel text-center">
                        <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-120q-33 0-56.5-23.5T240-200v-560q0-33 23.5-56.5T320-840h320q33 0 56.5 23.5T720-760v560q0 33-23.5 56.5T640-120H320Zm320-80v-560H320v560h320ZM508.5-651.5Q520-663 520-680t-11.5-28.5Q497-720 480-720t-28.5 11.5Q440-697 440-680t11.5 28.5Q463-640 480-640t28.5-11.5ZM0-360v-240h80v240H0Zm120 80v-400h80v400h-80Zm760-80v-240h80v240h-80Zm-120 80v-400h80v400h-80Zm-440 80v-560 560Z" /></svg>
                        <h2>Pedals</h2>
                        <hr className="rule-sm" />

                        <Link to="/equipment/pedals" className="btn">
                            <span>Explore Pedals</span>
                            <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" />
                        </Link>
                        <p className="subtitle">See a database of guitar and bass pedals that artists use.</p>
                        <ul className="pedal-list">
                            {pedal_list.map((pedal, index) => (
                                <li key={index} className="pedal-card">
                                    <Link className="pedal-link" to={`/equipment/pedals/${getSlug(pedal)}`}>
                                        <img className="pedal-photo" src={pedal.imageUrl || pedal.picture || "/placeholder-artist.png"} alt={pedal.displayName || pedal.name} />
                                        <div className="overlay">
                                            <h3>{pedal.displayName || pedal.name}</h3>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section id="cta_plugins">
                <div className="container">
                    <div className="panel text-center">
                        <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M352-120H200q-33 0-56.5-23.5T120-200v-152q48 0 84-30.5t36-77.5q0-47-36-77.5T120-568v-152q0-33 23.5-56.5T200-800h160q0-42 29-71t71-29q42 0 71 29t29 71h160q33 0 56.5 23.5T800-720v160q42 0 71 29t29 71q0 42-29 71t-71 29v160q0 33-23.5 56.5T720-120H568q0-50-31.5-85T460-240q-45 0-76.5 35T352-120Zm-152-80h85q24-66 77-93t98-27q45 0 98 27t77 93h85v-240h80q8 0 14-6t6-14q0-8-6-14t-14-6h-80v-240H480v-80q0-8-6-14t-14-6q-8 0-14 6t-6 14v80H200v88q54 20 87 67t33 105q0 57-33 104t-87 68v88Zm260-260Z" /></svg>
                        <h2>Plugins</h2>
                        <hr className="rule-sm" />

                        <Link to="/equipment/plugins" className="btn">
                            <span>Explore Plugins</span> <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" />
                        </Link>
                        <p className="subtitle">See a database of VST/VSTi, CLAP, and RTAS plugins that artists use.</p>
                        <ul className="plugin-list">
                            {plugin_list.map((plugin, index) => (
                                <li key={index} className="plugin-card">
                                    <Link className="plugin-link" to={`/equipment/plugins/${getSlug(plugin)}`}>
                                        <img className="plugin-photo" src={plugin.imageUrl || plugin.picture || "/placeholder-artist.png"} alt={plugin.displayName || plugin.name} />
                                        <div className="overlay">
                                            <h3>{plugin.displayName || plugin.name}</h3>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}