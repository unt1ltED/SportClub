import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SocialMediaLinks() {
    return (
        <>
            <Header />
            <div className="social-media-page">
                <h1>Follow Us on Social Media</h1>
                <ul>
                    <li><a href="https://facebook.com/sportclub" target="_blank">Facebook</a></li>
                    <li><a href="https://twitter.com/sportclub" target="_blank">Twitter</a></li>
                    <li><a href="https://instagram.com/sportclub" target="_blank">Instagram</a></li>
                </ul>
            </div>
            <Footer />
        </>
    );
}

export default SocialMediaLinks;
