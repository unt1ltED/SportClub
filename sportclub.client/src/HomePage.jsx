import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage">
            {/* Хедер */}
            <header class="header">
                <div class="container">
                    <div class="logo">
                        <a href="#">SportClub</a>
                    </div>
                    <nav class="nav">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Tariffs</a></li>
                            <li><a href="#">Schedule</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                    <div class="auth-buttons">
                        <a href="#" class="btn login">Log In</a>
                        <a href="#" class="btn register">Registration</a>
                    </div>
                    <div class="burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </header>




            {/* Главный баннер */}
            <section className="hero">
                <div className="container hero-content">
                    <h1 className="hero-title">Join Our Fitness Club!</h1>
                    <p className="hero-subtitle">Train, Improve, Succeed</p>
                    <button className="btn-primary hero-btn">Sign Up for Training</button>
                </div>
            </section>

            {/* Тарифы */}
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

            {/* Расписание */}
            <section className="schedule">
                <div className="container">
                    <h2 className="section-title">Training Schedule</h2>
                    <p>Explore our upcoming training sessions and book a slot today!</p>
                    <button className="btn-secondary">View Schedule</button>
                </div>
            </section>

            {/* Тренеры */}
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

            {/* Футер */}
            <footer className="footer">
                <div className="container">
                    <p>Contact Us | Privacy Policy | Social Media Links</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
