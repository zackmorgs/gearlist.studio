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