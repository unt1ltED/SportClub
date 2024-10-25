import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pagesStyles.css';

function PrivacyPolicy() {
    return (
        <>
            <Header />
            <div className="privacy-policy-page">
                <h1>Privacy Policy</h1>

                <h2>1. Introduction</h2>
                <p>
                    Your trust is important to us. This privacy policy describes how we process your data and protect your privacy.
                </p>

                <h2>2. Information Collection</h2>
                <p>
                    We collect personal data such as your name, email address, and other information that you provide voluntarily.
                    We also collect data automatically through cookies, analytical tools, and other technologies.
                </p>

                <h2>3. Use of Data</h2>
                <p>
                    Your data is used to provide services, improve our website, communicate with you, and for other purposes set out in this policy.
                </p>

                <h2>4. Transfer of Data to Third Parties</h2>
                <p>
                    We do not sell or share your personal data with third parties without your consent, except as required by law.
                </p>

                <h2>5. Data Security</h2>
                <p>
                    We take measures to protect your data from unauthorized access, loss, or alteration.
                </p>
            </div>
            <div className="fixed-bottom"><Footer /></div>
        </>
    );
}

export default PrivacyPolicy;
