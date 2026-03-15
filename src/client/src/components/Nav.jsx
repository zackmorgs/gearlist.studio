import React, { useState } from "react";

import { Link } from "react-router-dom";

const main_nav_links = [
    { name: "About", path: "/about" },
    { name: "Artists", path: "/artists" },
    { name: "Genres", path: "/genres" },
    { name: "Equipment", path: "/equipment" },
    // { name: "Equipment", path: "/equipment" },a
    { name: "Contact", path: "/contact" },
];

const auth_nav_links = [
    { name: "Login", path: "/login" },
    { name: "Profile", path: "/profile" },
];



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
            <div className={`nav-container ${isMenuOpen ? "active" : ""}`}>
                <ul className="nav-list">
                    {main_nav_links.map((link, index) => (
                        <li key={index} className="nav-item">
                            <Link to={link.path} className="nav-link" onClick={closeMenu}>
                                <u>{link.name}</u>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="nav-auth-links">
                    <b className="menu-title text-center">User</b>

                    <ul className="nav-list nav-auth-list">
                        {auth_nav_links.map((link, index) => (
                            <li key={index} className="nav-item">
                                <Link to={link.path} className="nav-link" onClick={closeMenu}>
                                    <u>{link.name}</u>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}