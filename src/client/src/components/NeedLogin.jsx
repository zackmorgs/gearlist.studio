import React from "react";
import { Link } from "react-router-dom";

export default function NeedLogin() {
    return (
        <>
            <header className="panel text-center">
                <h1>Unauthenticated</h1>
                <Link className="btn btn-primary" to="/login">Login</Link>
            </header>
        </>
    );
}