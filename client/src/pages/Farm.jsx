import React from "react";
import { Link } from 'react-router-dom';

export default function Farm() {
    return (
        <ul>
            <Link to='/Farm/Journal'>My Crop Journal</Link>
        </ul>
    );
}