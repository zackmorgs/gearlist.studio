import React, { useState } from "react";

import { Link } from "react-router-dom";

const nav_links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Artists", path: "/artists" },
    { name: "Equipment", path: "/equipment" },
    { name: "Contact", path: "/contact" },
]

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav id="nav_main">
            <div className="nav-bar">
                <Link to="/" id="nav_logo_link" onClick={closeMenu}>
                    <h1 id="nav_logo">
                        {/* <img src="/assets/svg/icon-database.svg" alt="gearlist.studio logo" id="nav_logo_image" /> */}
                        <span id="gearlist">gearlist</span><span id="dot">.</span><span id="studio">studio</span>
                    </h1>
                </Link>
                <button
                    id="nav_toggle"
                    aria-label="Toggle navigation menu"
                    onClick={toggleMenu}
                    className={isMenuOpen ? "active" : ""}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <ul className={`nav-list ${isMenuOpen ? "active" : ""}`}>
                {nav_links.map((link, index) => (
                    <li key={index} className="nav-item">
                        <Link to={link.path} className="nav-link" onClick={closeMenu}>
                            <u>{link.name}</u>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}