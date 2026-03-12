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
            <header className="panel">
                <h1>Discover the Gear Behind the Sound</h1>
                <p>This website aims to be the ultimate database of guitars, amps, pedals, plugins, and studio equipment used by musicians around the world.</p>
            </header>

            <section id="cta_artists" className="panel text-center">
                <img src="/assets/svg/icon-artist.svg" alt="Artist Icon" className="section-icon" />
                <h2>Artists</h2>
                <Link to="/artists" className="btn">
                    <span>Explore Artists</span> <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" />
                </Link>
                <p>Explore the gear via our curated artist profiles.</p>
                <ul className="artist-list">
                    {artist_example_list.map((artist, index) => (
                        <li key={index} className="artist-card">
                            <img className="artist-photo" src={artist.picture} alt={artist.name} />
                            <div className="overlay">
                                <h3>{artist.name}</h3>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section id="cta_instruments" className="panel text-center">
                <img alt="Instrument Icon" className="section-icon" src="/assets/svg/icon-piano.svg"></img>
                <h2>Instruments</h2>
                <Link to="/instruments" className="btn"><span>Explore Instruments</span> <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" /></Link>
                <p>See a database of guitars, bass, keyboards and other instruments that artists use.</p>
                <ul className="instrument-list">
                    {instrument_example_list.map((instrument, index) => (
                        <li key={index} className="instrument-card">
                            <img className="instrument-photo" src={instrument
                                .picture} alt={instrument.name} />
                            <div className="overlay">
                                <h3>{instrument.name}</h3>
                            </div>
                        </li>
                    ))}

                </ul>
            </section>


            <section id="cta_amps" className="panel text-center">
                <img alt="Amp Icon" className="section-icon" src="/assets/svg/icon-amp.svg"></img>
                <h2>Amps</h2>
                <Link to="/amps" className="btn"><span>Explore Amps</span> <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" /></Link>

                <ul className="amp-list">
                    {amp_example_list.map((amp, index) => (
                        <li key={index} className="amp-card">
                            <img className="amp-photo" src={amp.picture
                            } alt={amp.name} />
                            <div className="overlay">
                                <h3>{amp.name}</h3>
                            </div>
                        </li>
                    ))}

                </ul>
            </section>


            <section id="cta_pedals" className="panel text-center">
                <img alt="Pedal Icon" className="section-icon" src="/assets/svg/icon-pedal.svg"></img>
                <h2>Pedals</h2>
                <Link to="/pedals" className="btn">
                    <span>Explore Pedals</span>
                    <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" />
                </Link>
                <p>See a database of guitar and bass pedals that artists use.</p>
                <ul className="pedal-list">
                    {pedal_example_list.map((pedal, index) => (
                        <li key={index} className="pedal-card">
                            <img className="pedal-photo" src={pedal.picture
                            } alt={pedal.name} />
                            <div className="overlay">
                                <h3>{pedal.name}</h3>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section id="cta_plugins" className="panel text-center">
                <img alt="Plugin Icon" className="section-icon" src="/assets/svg/icon-puzzle.svg"></img>
                <h2>Plugins</h2>
                <Link to="/plugins" className="btn">
                    <span>Explore Plugins</span> <img src="/assets/svg/icon-arrow-forward.svg" alt="Arrow Forward Icon" className="btn-icon" />
                </Link>
                <p>See a database of VST/VSTi, CLAP, and RTAS plugins that artists use.</p>
                <ul className="plugin-list">
                    {plugin_example_list.map((plugin, index) => (
                        <li key={index} className="plugin-card">
                            <img className="plugin-photo" src={plugin.picture
                            } alt={plugin.name} />
                            <div className="overlay">
                                <h3>{plugin.name}</h3>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}