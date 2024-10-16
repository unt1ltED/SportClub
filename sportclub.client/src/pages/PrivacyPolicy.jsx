import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PrivacyPolicy() {
    return (
        <>
            <Header />
            <div className="privacy-policy-page">
                <h1>Privacy Policy</h1>
                <p>Your privacy is important to us. This is how we handle your data...</p>
            </div>
            <Footer />
        </>
    );
}

export default PrivacyPolicy;
