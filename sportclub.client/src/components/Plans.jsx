import React from 'react';
import '../styles/Plans.css';

const Plans = () => {
    return (
        <section className="plans">
            <div className="container">
                <h2 className="section-title">Our Tariffs</h2>
                <div className="cards">
                    <div className="card">
                        <h3 className="card-title">Standard</h3>
                        <p className="card-description">Ideal for beginners. Get access to all equipment and group classes.</p>
                    </div>
                    <div className="card">
                        <h3 className="card-title">Premium</h3>
                        <p className="card-description">For advanced athletes. Includes personal training sessions and more.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Plans;
