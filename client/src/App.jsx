// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

//importing components
import Nav from './components/NavTabs';
import Header from './components/Header';
import Footer from './components/Footer';
//importing pages
import Home from './pages/Home';
import Farm from './pages/Farm';
import Weather from './pages/Weather';

export default function App() {

  return (
    <Router>
      <Header />
      <Nav /> 
      <h2>Welcome to your farm!</h2>
      <h3>Managing your farm in one place</h3>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/farm" element={<Farm />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>

      <Footer />
    </Router>
  );
};

