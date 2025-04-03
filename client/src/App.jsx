// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

import Nav from './components/NavTabs';
// import Header from './components/Header';
// import Footer from './components/Footer';
import Home from './pages/Home';

export default function App() {

  return (
    <Router>
      {/* <Header /> */}
      <Nav /> 
      <h1>App</h1>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Resume" element={<Resume />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes> */}

      {/* <Footer /> */}
    </Router>
  );
};

