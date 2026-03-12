import React, { useState } from "react";

import { Link } from "react-router-dom";

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
                        <span id="gearlist">gearlist</span><span>.</span><span id="studio">studio</span>
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
                <li>
                    <Link className="nav-link" to="/" onClick={closeMenu}><u>Home</u></Link>
                </li>
                <li>
                    <Link className="nav-link" to="/about" onClick={closeMenu}><u>About</u></Link>
                </li>
                <li>
                    <Link className="nav-link" to="/artists" onClick={closeMenu}><u>Artists</u></Link>
                </li>
                <li>
                    <Link className="nav-link" to="/contact" onClick={closeMenu}><u>Contact</u></Link>
                </li>
            </ul>
        </nav>
    );
}