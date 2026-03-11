import React from "react";

let artist_example_list = [
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
]

export default function Home() {
    return (
        <>
            <header className="panel bg-black">
                <h1>Discover the Gear Behind the Sound</h1>
                <p>This website aims to be the ultimate database of guitars, amps, pedals, plugins, and studio equipment used by musicians around the world.</p>
            </header>

            <section id="cta_artists" className="panel bg-black text-center">
                <img src="/assets/svg/icon-artist.svg" alt="Artist Icon" className="section-icon" />

                <h2>Artists</h2>
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

            <section id="cta_guitars" className="panel bg-black text-center">
                <h2>Guitars & Basses</h2>
                <p>See a database of guitars and basses that artists use.</p>
            </section>


            <section id="cta_amps" className="panel bg-black text-center">
                <h2>Amps</h2>
                <p>See a database of guitar and bass amps that artists use.</p>
            </section>


            <section id="cta_pedals" className="panel bg-black text-center">
                <h2>Pedals</h2>
                <p>See a database of guitar and bass pedals that artists use.</p>
            </section>

            <section id="cta_plugins" className="panel bg-black text-center">
                <h2>Plugins</h2>
                <p>See a database of plugins that artists use.</p>
            </section>
        </>
    );
}