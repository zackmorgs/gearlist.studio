import React from "react";
import { Routes, Route } from "react-router-dom";

import Nav from './../components/Nav';
import Footer from './../components/Footer';

import AuthenticatedView from "./AuthenticatedView";
import NotAuthenticatedView from "./NotAuthenticatedView";

import NeedLogin from "./NeedLogin";


import Home from './../pages/Home';
import About from './../pages/About';
import Contact from './../pages/Contact';

import Create from './../pages/create/Create';

import Bands from "../pages/bands/Bands";
import Artists from '../pages/artists/Artists';
import Genres from './../pages/Genres';
import Equipment from "../pages/equipment/Equipment";

import Amps from "../pages/equipment/Amps";
import Cabs from "../pages/equipment/Cab";
import Instruments from "../pages/equipment/Instruments";
import Pedals from "../pages/equipment/Pedals";
import Plugins from "../pages/equipment/Plugins";

import GenrePage from './../pages/genre/GenrePage';
import ArtistPage from './../pages/artists/ArtistPage';
import BandPage from "../pages/bands/BandPage";

import AmpPage from "../pages/equipment/entity-page/AmpPage";
import CabPage from "../pages/equipment/entity-page/CabPage";
import InstrumentPage from "../pages/equipment/entity-page/InstrumentPage";
import PedalPage from "../pages/equipment/entity-page/PedalPage";
import PluginPage from "../pages/equipment/entity-page/PluginPage";

import NewBand from "../pages/bands/NewBand";
import AddMember from "../pages/bands/AddMember";
import NewGenre from "../pages/genre/NewGenre";
import NewArtistPage from "../pages/artists/NewArtistPage";
import NewAmp from "../pages/equipment/new/NewAmp";
import NewCab from "../pages/equipment/new/NewCab";
import NewInstrument from "../pages/equipment/new/NewInstrument";
import NewPedal from "../pages/equipment/new/NewPedal";
import NewPlugin from "../pages/equipment/new/NewPlugin";

import EditArtist from "../pages/artists/EditArtist";
import EditBand from "../pages/bands/EditBand";
// import EditGenre from "../pages/genre/EditGenre";
import EditAmp from "../pages/equipment/entity-page/EditAmp";
import EditInstrument from "../pages/equipment/entity-page/EditInstrument";
import EditPedal from "../pages/equipment/entity-page/EditPedal";
import EditPlugin from "../pages/equipment/entity-page/EditPlugin";
import EditCab from "../pages/equipment/entity-page/EditCab";

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

          {/* creation handler */}
          <Route path="/create/:createItem" element={
            <>
              <AuthenticatedView><Create /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />

          {/* high level browsing */}
          <Route path="/bands/" element={<Bands />} />
          <Route path="/artists/" element={<Artists />} />
          <Route path="/genres/" element={<Genres />} />
          <Route path="/equipment/" element={<Equipment />} />

          {/* equipment categories */}
          <Route path="/equipment/amps" element={<Amps />} />
          <Route path="/equipment/instruments" element={<Instruments />} />
          <Route path="/equipment/pedals" element={<Pedals />} />
          <Route path="/equipment/plugins" element={<Plugins />} />
          <Route path="/equipment/cabs" element={<Cabs />} />

          {/* new entity forms — must be before :slug routes */}
          <Route path="/bands/:slug/add-member" element={
            <>
              <AuthenticatedView><AddMember /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />
          <Route path="/bands/new" element={
            <>
              <AuthenticatedView><NewBand /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />
          <Route path="/bands/new/:bandName" element={
            <>
              <AuthenticatedView><NewBand /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />
          <Route path="/genres/new" element={
            <>
              <AuthenticatedView><NewGenre /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />
          <Route path="/artists/new" element={
            <>
              <AuthenticatedView><NewArtistPage /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />
          <Route path="/equipment/amps/new" element={
            <>
              <AuthenticatedView><NewAmp /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />
          <Route path="/equipment/cabs/new" element={
            <>
              <AuthenticatedView><NewCab /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />
          <Route path="/equipment/instruments/new" element={
            <>
              <AuthenticatedView><NewInstrument /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />
          <Route path="/equipment/pedals/new" element={
            <>
              <AuthenticatedView><NewPedal /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />
          <Route path="/equipment/plugins/new" element={
            <>
              <AuthenticatedView><NewPlugin /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />

          {/* entity view pages */}
          <Route path="/bands/:slug" element={<BandPage />} />
          <Route path="/artists/:slug" element={<ArtistPage />} />
          <Route path="/genres/:slug" element={<GenrePage />} />
          <Route path="/equipment/amps/:slug" element={<AmpPage />} />
          <Route path="/equipment/cabs/:slug" element={<CabPage />} />
          <Route path="/equipment/instruments/:slug" element={<InstrumentPage />} />
          <Route path="/equipment/pedals/:slug" element={<PedalPage />} />
          <Route path="/equipment/plugins/:slug" element={<PluginPage />} />

          {/* edit pages */}
          <Route path="/bands/:slug/edit" element={
            <>
              <AuthenticatedView>
                <EditBand />
              </AuthenticatedView>
              <NotAuthenticatedView>
                <NeedLogin />
              </NotAuthenticatedView>
            </>
          } />
          <Route path="/artists/:slug/edit" element={
            <>
              <AuthenticatedView><EditArtist /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />
          {/* <Route path="/genres/:slug/edit" element={<EditGenre />} /> */}
          <Route path="/equipment/amps/:slug/edit" element={
            <>
              <AuthenticatedView><EditAmp /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />
          <Route path="/equipment/cabs/:slug/edit" element={
            <>
              <AuthenticatedView><EditCab /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />
          <Route path="/equipment/instruments/:slug/edit" element={
            <>
              <AuthenticatedView><EditInstrument /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />
          <Route path="/equipment/pedals/:slug/edit" element={
            <>
              <AuthenticatedView><EditPedal /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />
          <Route path="/equipment/plugins/:slug/edit" element={
            <>
              <AuthenticatedView><EditPlugin /></AuthenticatedView>
              <NotAuthenticatedView><NeedLogin /></NotAuthenticatedView>
            </>
          } />



          {/* authentication */}
          <Route path="/login/" element={<Login />} />
          <Route path="/profile/" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </>

  );
}
