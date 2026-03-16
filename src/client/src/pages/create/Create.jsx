import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Create() {
    return (
        <>
            <header className="panel text-center">
                <h1>Create</h1>
            </header>
            <section className="panel">
                <p>You've elected to make a new item for our database. </p>
                <p>Please select the appropriate category and fill out the item creation form.</p>
            </section>
            <section id="amps" className="panel">
                <ul className="create-list">
                    <li className="create-item">
                        <Link to="/equipment/amps/new" className="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg><span>Add an Amp</span>
                        </Link>
                    </li>
                    <li className="create-item">
                        <Link to="/equipment/cabs/new" className="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg><span>Add a Cab</span>
                        </Link>
                    </li>
                    <li className="create-item">
                        <Link to="/equipment/pedals/new" className="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg><span>Add a Pedal</span>
                        </Link>
                    </li>
                    <li className="create-item">
                        <Link to="/equipment/guitars/new" className="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /></svg><span>Add a Guitar</span>
                        </Link>

                    </li>
                </ul>
            </section>
        </>
    );
}