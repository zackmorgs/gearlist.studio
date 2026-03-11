import React from "react";

export function App() {
  return (
    <main className="app-shell">
      <header className="hero">
        <h1>gearlist.studio</h1>
        <p>Find the gear your favorite musicians use.</p>
      </header>
      <section className="panel">
        <h2>API status</h2>
        <p>Backend endpoint expected at <strong>/api/health</strong>.</p>
      </section>
    </main>
  );
}