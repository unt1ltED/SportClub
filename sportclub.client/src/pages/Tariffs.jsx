import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pagesStyles.css'


function Tariffs() {
    return (
        <>
            <Header />
            <div className="plans">
                <div className="container">
                    <h1 className="section-title">Our Tariffs</h1>
                    <div className="cards">
                        <div className="card">
                            <h2>Standard</h2>
                            <p>Access to all equipment and group classes for beginners.</p>
                        </div>
                        <div className="card">
                            <h2>Premium</h2>
                            <p>Includes personal training sessions and premium features for advanced athletes.</p>
                        </div>
                        <div className="card">
                            <h2>Gold</h2>
                            <p>All Premium benefits plus access to exclusive workshops and events.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed-bottom"><Footer /></div>
        </>
    );
}

export default Tariffs;
