import React from 'react';
import './styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <a href="#">SportClub</a>
                </div>
                <nav className="nav">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/tariffs">Tariffs</a></li>
                        <li><a href="/schedule">Schedule</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
                <div className="auth-buttons">
                    <a href="/login" className="btn login">Log In</a>
                    <a href="/register" className="btn register">Registration</a>
                </div>
                <div className="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    );
};

export default Header;
