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
import Instruments from "../pages/equipment/Instruments";
import Pedals from "../pages/equipment/Pedals";
import Plugins from "../pages/equipment/Plugins";

import GenrePage from './../pages/genre/GenrePage';
import ArtistPage from './../pages/artists/ArtistPage';

import AmpPage from "../pages/equipment/entity-page/AmpPage";
import InstrumentPage from "../pages/equipment/entity-page/InstrumentPage";
import PedalPage from "../pages/equipment/entity-page/PedalPage";
import PluginPage from "../pages/equipment/entity-page/PluginPage";

import NewArtistPage from "../pages/artists/NewArtistPage";
import NewAmp from "../pages/equipment/new/NewAmp";
import NewInstrument from "../pages/equipment/new/NewInstrument";
import NewPedal from "../pages/equipment/new/NewPedal";
import NewPlugin from "../pages/equipment/new/NewPlugin";

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

          {/* new entity forms — must be before :slug routes */}
          <Route path="/artists/new" element={<NewArtistPage />} />
          <Route path="/equipment/amps/new" element={<NewAmp />} />
          <Route path="/equipment/instruments/new" element={<NewInstrument />} />
          <Route path="/equipment/pedals/new" element={<NewPedal />} />
          <Route path="/equipment/plugins/new" element={<NewPlugin />} />

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
