import React from "react";
import { Routes, Route } from "react-router-dom";

import Nav from './../components/Nav';
import Footer from './../components/Footer';

import Home from './../pages/Home';
import About from './../pages/About';
import Contact from './../pages/Contact';
import Artists from './../pages/Artists';
import Gear from './../pages/Gear';

export function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/artists/" element={<Artists />} />
          <Route path="/gear/" element={<Gear />} />
        </Routes>
      </main>
      <Footer />
    </>

  );
}
