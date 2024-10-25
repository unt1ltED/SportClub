import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import LoginModal from '../Login';
import RegisterModal from '../Register';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        setIsAuthenticated(!!token);

        if (role) {
            const parsedRole = JSON.parse(role);
            setUserRole(parsedRole);
        }
    }, []);

    const openLoginModal = () => setShowLoginModal(true);
    const closeLoginModal = () => setShowLoginModal(false);

    const openRegisterModal = () => setShowRegisterModal(true);
    const closeRegisterModal = () => setShowRegisterModal(false);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');

        setIsAuthenticated(false);
        setUserRole(null);

        navigate('/');
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link to="/">SportClub</Link>
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                            <li className="nav-item"><Link to="/tariffs" className="nav-link">Tariffs</Link></li>
                            <li className="nav-item"><Link to="/schedule" className="nav-link">Schedule</Link></li>
                            <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>

                            {userRole && userRole.role === 'Admin' && (
                                <li className="nav-item">
                                    <Link to="/adminpanel" className="nav-link">Admin Panel</Link>
                                </li>
                            )}
                            {userRole && userRole.role === 'Coach' && (
                                <li className="nav-item">
                                    <Link to="/coachpanel" className="nav-link">Coach Panel</Link>
                                </li>
                            )}

                        </ul>

                        <div className="navbar-nav ml-auto">
                            {!isAuthenticated ? (
                                <>
                                    <button className="btn btn-success" onClick={openLoginModal}>Log In</button>
                                    <button className="btn btn-primary" onClick={openRegisterModal}>Registration</button>
                                </>
                            ) : (
                                <div className="profile-section">
                                    <Link to="/profile" className="profile-icon">
                                        <img src="src/img/profile_icon.svg" alt="Profile" width="50" height="50" />
                                    </Link>
                                    <button className="btn btn-danger logout-button" onClick={logout}>
                                        <img src="src/img/exit_icon.svg" alt="Logout" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </div>

            {showLoginModal && <LoginModal closeModal={closeLoginModal} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />}
            {showRegisterModal && <RegisterModal closeModal={closeRegisterModal} />}
        </header>
    );
};

export default Header;
