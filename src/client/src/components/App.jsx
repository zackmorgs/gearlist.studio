import React from "react";
import { Routes, Route } from "react-router-dom";

import Nav from './../components/Nav';
import Footer from './../components/Footer';

import Home from './../pages/Home';
import About from './../pages/About';
import Contact from './../pages/Contact';
import Artists from '../pages/artists/Artists';
import Genres from './../pages/Genres';
import Equipment from "../pages/equipment/Equipment";
import Amps from "../pages/equipment/Amps";
import Instrument from "../pages/equipment/Instruments";
import Pedals from "../pages/equipment/Pedals";
import Plugins from "../pages/equipment/Plugins";

import GenrePage from './../pages/genre/GenrePage';
import ArtistPage from './../pages/artists/ArtistPage';

import AmpPage from "../pages/equipment/entity-page/AmpPage";
import InstrumentPage from "../pages/equipment/entity-page/InstrumentPage";
import PedalPage from "../pages/equipment/entity-page/PedalPage";
import PluginPage from "../pages/equipment/entity-page/PluginPage";

import Login from "../pages/auth/Login";
import Profile from "../pages/auth/Profile";

export function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* basic content */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* high level browsing */}
          <Route path="/artists/" element={<Artists />} />
          <Route path="/genres/" element={<Genres />} />
          <Route path="/equipment/" element={<Equipment />} />

          {/* equipment categories */}
          <Route path="/equipment/amps" element={<Amps />} />
          <Route path="/equipment/instruments" element={<Instruments />} />
          <Route path="/equipment/pedals" element={<Pedals />} />
          <Route path="/equipment/plugins" element={<Plugins />} />

          {/* entity pages */}
          <Route path="/artists/:slug" element={<ArtistPage />} />
          <Route path="/genres/:slug" element={<GenrePage />} />
          <Route path="/equipment/amps/:slug" element={<AmpPage />} />
          <Route path="/equipment/instruments/:slug" element={<InstrumentPage />} />
          <Route path="/equipment/pedals/:slug" element={<PedalPage />} />
          <Route path="/equipment/plugins/:slug" element={<PluginPage />} />

          {/* authentication */}
          <Route path="/login/" element={<Login />} />
          <Route path="/profile/" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </>

  );
}
