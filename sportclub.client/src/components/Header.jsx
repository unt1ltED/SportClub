import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import LoginModal from '../Login';
import RegisterModal from '../Register';
import { Link } from 'react-router-dom';

const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token found:", token); // Логируем найденный токен
        setIsAuthenticated(!!token); // Преобразуем значение токена в boolean
    }, []); // Убираем зависимость isAuthenticated

    const openLoginModal = () => setShowLoginModal(true);
    const closeLoginModal = () => setShowLoginModal(false);

    const openRegisterModal = () => setShowRegisterModal(true);
    const closeRegisterModal = () => setShowRegisterModal(false);

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link to="/">SportClub</Link>
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
                    {!isAuthenticated ? (
                        <>
                            <button className="btn login" onClick={openLoginModal}>Log In</button>
                            <button className="btn register" onClick={openRegisterModal}>Registration</button>
                        </>
                    ) : (
                        <div className="profile-section">
                            <Link to="/profile" className="profile-icon">
                                <img src="/path/to/profile-icon.png" alt="Profile" />
                            </Link>
                            <button className="btn logout" onClick={logout}>Logout</button>
                        </div>
                    )}
                </div>
                <div className="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {showLoginModal && <LoginModal closeModal={closeLoginModal} setIsAuthenticated={setIsAuthenticated} />}
            {showRegisterModal && <RegisterModal closeModal={closeRegisterModal} />}
        </header>
    );
};

export default Header;
