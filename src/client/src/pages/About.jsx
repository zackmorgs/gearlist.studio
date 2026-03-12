import React from "react";

export default function About() {
    // const { slug } = useParams();

    return (
        <>
            <header className="panel text-center">
                <h1>About</h1>
                <hr className="rule-sm" />
                <p><b>gearlist.studio</b> is a community-driven database dedicated to the gear that shapes modern music.</p>
            </header>
            <section id="about_mission" class="panel">
                <h2 className="text-center">Our Mission</h2>
                <hr className="rule-sm" />

                <p>Musicians are constantly searching for answers like:</p>
                <ul className="list-text">
                    <li>What gear does this artist use?</li>
                    <li>What pedals create that tone?</li>
                    <li>What equipment do I need for my own setup?</li>
                </ul>
                <p><b>gearlist.studio</b> exists to answer those questions in one place.</p>
            </section>
            <section id="about_goal" class="panel ">
                <h2 className="text-center">Our Goal</h2>
                <hr className="rule-sm" />

                <p>We aim to build a comprehensive database of:</p>
                <ul className="list-text">
                    <li><b>guitars</b></li>
                    <li><b>amplifiers</b>  </li>
                    <li><b>pedals</b> and <b>effects</b></li>
                    <li>audio <b>plugins</b></li>
                </ul>

            </section>

        </>
    ); 1
}