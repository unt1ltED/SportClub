import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer bg-#1f1f1f text-light">
            <div className="container text-center py-4">
                <p className="mb-1">
                    <Link to="/contact" className="footer-link">Contact Us</Link> |
                    <Link to="/privacy-policy" className="footer-link"> Privacy Policy</Link> |
                    <Link to="/social-media" className="footer-link"> Social Media Links</Link>
                </p>
                <p className="mb-0">&copy; {new Date().getFullYear()} SportClub</p>
            </div>
        </footer>
    );
};

export default Footer;
