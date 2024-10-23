import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer bg-#1f1f1f; text-light">
            <div className="container text-center py-4">
                <p className="mb-1">Contact Us | Privacy Policy | Social Media Links</p>
                <p className="mb-0">&copy; {new Date().getFullYear()} SportClub</p>
            </div>
        </footer>
    );
};

export default Footer;
