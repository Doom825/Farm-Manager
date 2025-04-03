import React from "react";
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <div>
                <h4>Made with love by Colton Ambrose, Calvin Mark Taylor III, Jeremiah Falk, and Ivelis Becker</h4>
                <a href="https://github.com/Ctbambrose" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={30} /> Ctbambrose
                </a>
                <a href="https://github.com/Doom825/ " target="_blank" rel="noopener noreferrer">
                    <FaGithub size={30} /> Doom825
                </a>
                <a href="https://github.com/jedfalk" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={30} /> jedfalk
                </a>
                <a href="https://www.github.com/I-0110" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={30} /> I-0110
                </a>
            </div>
        </footer>
    );
};

export default Footer;