import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-content">
                <h1 className="hero-title">Join Our Fitness Club!</h1>
                <p className="hero-subtitle">Train, Improve, Succeed</p>
                <button className="btn-primary hero-btn">Sign Up for Training</button>
            </div>
        </section>
    );
};

export default Hero;
