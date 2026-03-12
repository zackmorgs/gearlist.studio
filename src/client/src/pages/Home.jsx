import React from "react";
import { Link } from "react-router-dom";

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
    return (
        <>
            <header className="panel text-center">
                <h1>Discover the Gear Behind the Sound</h1>
                <p>The ultimate database of guitars, amps, pedals, plugins, and studio equipment used by musicians around the world.</p>
                <input id="search_input" type="text" placeholder="Search for artists, instruments, amps, pedals, and plugins..." className="input" />
                <br />
                {/* <Link id="search_Link" className="btn">
                    <span>Search</span>
                    <img src="/assets/svg/icon-search.svg" alt="Search Icon" className="btn-icon" />
                </Link> */}
            </header>

            <section id="cta_artists" className="panel text-center">
                <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M740-560h140v80h-80v220q0 42-29 71t-71 29q-42 0-71-29t-29-71q0-42 29-71t71-29q8 0 18 1.5t22 6.5v-208ZM120-160v-112q0-35 17.5-63t46.5-43q62-31 126-46.5T440-440q42 0 83.5 6.5T607-414q-20 12-36 29t-28 37q-26-6-51.5-9t-51.5-3q-57 0-112 14t-108 40q-9 5-14.5 14t-5.5 20v32h321q2 20 9.5 40t20.5 40H120Zm207-367q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm169.5-56.5Q520-607 520-640t-23.5-56.5Q473-720 440-720t-56.5 23.5Q360-673 360-640t23.5 56.5Q407-560 440-560t56.5-23.5ZM440-640Zm0 400Z" /></svg>
                <h2>Artists</h2>
                <hr className="rule-sm" />
                <Link to="/artists" className="btn">
                    <span>Explore Artists</span> <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" />
                </Link>
                <p>Explore the gear via our curated artist profiles.</p>
                <ul className="artist-list">
                    {artist_example_list.map((artist, index) => (
                        <li key={index} className="artist-card">
                            <Link to={`/artists/${artist.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                <img className="artist-photo" src={artist.picture} alt={artist.name} />
                                <div className="overlay">
                                    <h3>{artist.name}</h3>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section id="cta_instruments" className="panel text-center">
                <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h130v-180h-10q-17 0-28.5-11.5T280-420v-340h-80v560Zm430 0h130v-560h-80v340q0 17-11.5 28.5T640-380h-10v180Zm-240 0h180v-180h-10q-17 0-28.5-11.5T520-420v-340h-80v340q0 17-11.5 28.5T400-380h-10v180Z" /></svg>
                <h2>Instruments</h2>
                <hr className="rule-sm" />

                <Link to="/instruments" className="btn"><span>Explore Instruments</span> <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" /></Link>
                <p>See a database of guitars, bass, keyboards and other instruments that artists use.</p>
                <ul className="instrument-list">
                    {instrument_example_list.map((instrument, index) => (
                        <li key={index} className="instrument-card">
                            <Link to={`/instruments/${instrument.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                <img className="instrument-photo" src={instrument
                                    .picture} alt={instrument.name} />
                                <div className="overlay">
                                    <h3>{instrument.name}</h3>
                                </div>
                            </Link>
                        </li>
                    ))}

                </ul>
            </section>


            <section id="cta_amps" className="panel text-center">
                <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-360h640v-320H160v320Zm40 160q-17 0-28.5-11.5T160-240v-40q-33 0-56.5-23.5T80-360v-320q0-33 23.5-56.5T160-760h640q33 0 56.5 23.5T880-680v320q0 33-23.5 56.5T800-280v40q0 17-11.5 28.5T760-200q-17 0-28.5-11.5T720-240v-40H240v40q0 17-11.5 28.5T200-200Zm-40-160v-320 320Zm556.5-103.5Q740-487 740-520t-23.5-56.5Q693-600 660-600t-56.5 23.5Q580-553 580-520t23.5 56.5Q627-440 660-440t56.5-23.5ZM240-440h280v-160H240v160Z" /></svg>
                <h2>Amps</h2>
                <hr className="rule-sm" />

                <Link to="/amps" className="btn"><span>Explore Amps</span> <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" /></Link>

                <ul className="amp-list">
                    {amp_example_list.map((amp, index) => (
                        <li key={index} className="amp-card">
                            <Link to={`/amps/${amp.name.toLowerCase().replace(/\s+/g, '-')}`}>

                                <img className="amp-photo" src={amp
                                    .picture} alt={amp.name} />
                                <div className="overlay">
                                    <h3>{amp.name}</h3>
                                </div>
                            </Link>
                        </li>
                    ))}

                </ul>
            </section>


            <section id="cta_pedals" className="panel text-center">
                <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-120q-33 0-56.5-23.5T240-200v-560q0-33 23.5-56.5T320-840h320q33 0 56.5 23.5T720-760v560q0 33-23.5 56.5T640-120H320Zm320-80v-560H320v560h320ZM508.5-651.5Q520-663 520-680t-11.5-28.5Q497-720 480-720t-28.5 11.5Q440-697 440-680t11.5 28.5Q463-640 480-640t28.5-11.5ZM0-360v-240h80v240H0Zm120 80v-400h80v400h-80Zm760-80v-240h80v240h-80Zm-120 80v-400h80v400h-80Zm-440 80v-560 560Z" /></svg>
                <h2>Pedals</h2>
                <hr className="rule-sm" />

                <Link to="/pedals" className="btn">
                    <span>Explore Pedals</span>
                    <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" />
                </Link>
                <p>See a database of guitar and bass pedals that artists use.</p>
                <ul className="pedal-list">
                    {pedal_example_list.map((pedal, index) => (
                        <li key={index} className="pedal-card">
                            <Link to={`/pedals/${pedal.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                <img className="pedal-photo" src={pedal.picture
                                } alt={pedal.name} />
                                <div className="overlay">
                                    <h3>{pedal.name}</h3>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section id="cta_plugins" className="panel text-center">
                <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M352-120H200q-33 0-56.5-23.5T120-200v-152q48 0 84-30.5t36-77.5q0-47-36-77.5T120-568v-152q0-33 23.5-56.5T200-800h160q0-42 29-71t71-29q42 0 71 29t29 71h160q33 0 56.5 23.5T800-720v160q42 0 71 29t29 71q0 42-29 71t-71 29v160q0 33-23.5 56.5T720-120H568q0-50-31.5-85T460-240q-45 0-76.5 35T352-120Zm-152-80h85q24-66 77-93t98-27q45 0 98 27t77 93h85v-240h80q8 0 14-6t6-14q0-8-6-14t-14-6h-80v-240H480v-80q0-8-6-14t-14-6q-8 0-14 6t-6 14v80H200v88q54 20 87 67t33 105q0 57-33 104t-87 68v88Zm260-260Z" /></svg>
                <h2>Plugins</h2>
                <hr className="rule-sm" />

                <Link to="/plugins" className="btn">
                    <span>Explore Plugins</span> <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" />
                </Link>
                <p>See a database of VST/VSTi, CLAP, and RTAS plugins that artists use.</p>
                <ul className="plugin-list">
                    {plugin_example_list.map((plugin, index) => (
                        <li key={index} className="plugin-card">
                            <Link to={`/plugins/${plugin.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                <img className="plugin-photo" src={plugin.picture
                                } alt={plugin.name} />
                                <div className="overlay">
                                    <h3>{plugin.name}</h3>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}