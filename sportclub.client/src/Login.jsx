import React, { useState } from 'react';
import axios from 'axios';
import './Register_Login.css';

const LoginModal = ({ closeModal, setIsAuthenticated, setUserRole }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7058/api/auth/login', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            //console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('role',JSON.stringify(response.data.role))
            //console.log(response.data.user);
            //console.log(response.data.role);



            setIsAuthenticated(true);
            setUserRole(response.data.role);
            //console.log(setUserRole)
            closeModal();
        } catch (error) {
            console.error('Login failed:', error.response?.data.errors || error.message);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Log In</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
