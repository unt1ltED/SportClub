import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Contact() {
    return (
        <>
            <Header />
            <main>
                <h1>Contact Us</h1>
                <p>We would love to hear from you! Contact us via:</p>
                <ul>
                    <li>Email: support@sportclub.com</li>
                    <li>Phone: +1 234 567 890</li>
                    <li>Address: 123 Fitness St, Sport City</li>
                </ul>
            </main>
            <div class="fixed-bottom"><Footer /></div>
        </>
    );
}

export default Contact;
