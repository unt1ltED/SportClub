import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Tariffs() {
    return (
        <>
            <Header />
            <div className="plans-page">
                <h1>Our Tariffs</h1>
                <div className="plans">
                    <div className="plan">
                        <h2>Standard</h2>
                        <p>Access to all equipment and group classes for beginners.</p>
                    </div>
                    <div className="plan">
                        <h2>Premium</h2>
                        <p>Includes personal training sessions and premium features for advanced athletes.</p>
                    </div>
                </div>
            </div>
            <div class="fixed-bottom"><Footer /></div>
        </>
    );
}

export default Tariffs;
