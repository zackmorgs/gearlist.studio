import React from "react";

import { Link } from "react-router-dom";

export default function Footer() {
    const todaysYear = new Date().getFullYear();;

    return (
        <footer id="footer_main">
            <p>&copy;{todaysYear} gearlist.studio.</p>
            <p><small>All rights reserved.</small></p>
        </footer>
    );
}