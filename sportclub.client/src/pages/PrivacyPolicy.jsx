import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pagesStyles.css'


function PrivacyPolicy() {
    return (
        <>
            <Header />
            <div className="privacy-policy-page">
                <h1>Privacy Policy</h1>
                <p>Your privacy is important to us. This is how we handle your data...</p>
            </div>
            <div className="fixed-bottom"><Footer /></div>
        </>
    );
}

export default PrivacyPolicy;
