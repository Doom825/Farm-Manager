import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// importing myFarm pages. 
// TODO: Please uncomment and delete this line after adding info to myFarm
// import Crops from './myFarm/Crops';
// import Soils from './myFarm/Soils';
import CropJournal from './myFarm/CropJournal';

export default function Farm() {
    return (
        <Router>
            <h2>What are we managing today?</h2>
            {/* TODO: Go to these pages on myFarm and fill them up with the info they need */}   
            <Routes>
                {/* <Route path="/myCrops" element={<Crops />} />
                <Route path="/mySoils" element={<Soils />} /> */}
                <Route path="/journal" element={<CropJournal />} />
            </Routes>
        </Router>
    );
}