import React from "react";

import { Link } from "react-router-dom";

export default function Footer() {
    const todaysYear = new Date().getFullYear();;

    return (
        <footer id="footer_main">
            <div className="container">
                <p>&copy;{todaysYear} gearlist.studio.</p>
                <p><small>All rights reserved.</small></p>
            </div>
        </footer>
    );
}