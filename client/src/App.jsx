import React from 'react';
// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

//importing components
import Nav from './components/NavTabs';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn'; 
//importing pages
import Home from './pages/Home';
import Farm from './pages/Farm';
import Weather from './pages/Weather';

// importing myFarm pages. 
// TODO: Please uncomment and delete this line after adding info to myFarm
// import Crops from './pages/myFarm/Crops';
// import Soils from './pages/myFarm/Soils';
import Journal from './pages/myFarm/CropJournal';

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
        <Route path="/farm/journal" element={<Journal userId={localStorage.getItem('user_id')} />}/>
        <Route path="/weather" element={<Weather />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>

      <Footer />
    </Router>
  );
};

