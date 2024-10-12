import React from 'react';
import './styles/Coaches.css';

const Coaches = () => {
    return (
        <section className="coaches">
            <div className="container">
                <h2 className="section-title">Our Coaches</h2>
                <div className="cards">
                    <div className="card">
                        <img src="trainer1.jpg" alt="Ivan Ivanov" className="card-img" />
                        <h3 className="card-title">Ivan Ivanov</h3>
                        <p className="card-description">Fitness Specialist</p>
                    </div>
                    <div className="card">
                        <img src="trainer2.jpg" alt="Maria Petrova" className="card-img" />
                        <h3 className="card-title">Maria Petrova</h3>
                        <p className="card-description">Yoga Instructor</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Coaches;
