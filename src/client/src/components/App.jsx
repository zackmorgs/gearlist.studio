import React from "react";
import { Routes, Route } from "react-router-dom";

import Nav from './../components/Nav';
import Footer from './../components/Footer';

import Home from './../pages/Home';
import About from './../pages/About';
import Contact from './../pages/Contact';
import Artists from './../pages/Artists';
import Genres from './../pages/Genres';
import GenrePage from './../pages/genre/GenrePage';
import Equipment from "../pages/Equipment";
import Amps from "../pages/equipment/Amps";
import Instrument from "../pages/equipment/Instrument";
import Pedals from "../pages/equipment/Pedals";
import Plugins from "../pages/equipment/Plugins";


import Login from "../pages/auth/Login";
import Profile from "../pages/auth/Profile";

export function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bands/" element={<Bands />} />
          <Route path="/artists/" element={<Artists />} />
          <Route path="/genres/" element={<Genres />} />
          <Route path="/genres/:slug" element={<GenrePage />} />
          <Route path="/equipment/" element={<Equipment />} />
          <Route path="/equipment/amps" element={<Amps />} />
          <Route path="/equipment/instruments" element={<Instrument />} />
          <Route path="/equipment/pedals" element={<Pedals />} />
          <Route path="/equipment/plugins" element={<Plugins />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/profile/" element={<Profile />} />

        </Routes>
      </main>
      <Footer />
    </>

  );
}
