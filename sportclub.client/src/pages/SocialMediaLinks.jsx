import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pagesStyles.css'


function SocialMediaLinks() {
    return (
        <>
            <Header />
            <div className="social-media-page">
                <h1>Follow Us on Social Media</h1>
                <ul>
                    <li><a href="https://facebook.com/sportclub" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="https://twitter.com/sportclub" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    <li><a href="https://instagram.com/sportclub" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>
            </div>
            <div className="fixed-bottom"><Footer /></div>
        </>
    );
}

export default SocialMediaLinks;
