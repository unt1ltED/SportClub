import React, { useState } from 'react';
import '../styles/Header.css';
import LoginModal from '../Login';
import RegisterModal from '../Register';
import { Link } from 'react-router-dom';

const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const openLoginModal = () => setShowLoginModal(true);
    const closeLoginModal = () => setShowLoginModal(false);

    const openRegisterModal = () => setShowRegisterModal(true);
    const closeRegisterModal = () => setShowRegisterModal(false);

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <a href="#">SportClub</a>
                </div>
                <nav className="nav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/tariffs">Tariffs</Link></li>
                        <li><Link to="/schedule">Schedule</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
                <div className="auth-buttons">
                    <button className="btn login" onClick={openLoginModal}>Log In</button>
                    <button className="btn register" onClick={openRegisterModal}>Registration</button>
                </div>
                <div className="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {showLoginModal && <LoginModal closeModal={closeLoginModal} />}
            {showRegisterModal && <RegisterModal closeModal={closeRegisterModal} />}
        </header>
    );
};

export default Header;
