import React from "react";
import { Link, useParams } from "react-router-dom";

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

export default function Artists() {
    // const { slug } = useParams();

    return (
        <>
            <header className="panel text-center">
                <h1>Artists</h1>
            </header>
            <section id="artist_browse" className="panel">
                <div className="input-group">
                    <svg className="icon-search" xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 -960 960 960" width="1rem" fill="#111111"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                    <input id="search_input" type="search" placeholder="Search artists..." className="input input-search" />
                </div>
                <br />

                <ul className="artist-grid">
                    {artist_example_list.map((artist, index) => (
                        <li key={index} className="artist-card">
                            <Link to={`/artists/${artist.name.toLowerCase().replace(/\s+/g, '-')}`} className="artist-link">
                                <img src={artist.picture} alt={artist.name} className="artist-picture" />
                                <div className="overlay">
                                    <h3 className="artist-name">{artist.name}</h3>
                                </div>
                            </Link>
                        </li>
                    ))}

                </ul>
            </section>
        </>
    );
}