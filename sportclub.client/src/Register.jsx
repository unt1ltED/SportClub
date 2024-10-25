import React, { useState } from 'react';
import axios from 'axios';
import './Register_Login.css';

const RegisterModal = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        let isValid = true;

        if (username.length < 3) {
            setUsernameError('Username must be at least 3 characters');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (!email.includes('@')) {
            setEmailError('Invalid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (phoneNumber.length < 10) {
            setPhoneError('Phone number must be at least 10 digits');
            isValid = false;
        } else {
            setPhoneError('');
        }

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!isValid) return;

        try {
            const response = await axios.post('https://localhost:7058/api/auth/register', {
                username,
                email,
                phoneNumber,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('User registered successfully:', response.data);
            closeModal();
        } catch (error) {
            console.error('Registration failed:', error.response?.data.errors || error.message);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Registration</h2>
                <form onSubmit={handleRegister}>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {usernameError && <p className="error">{usernameError}</p>}
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {emailError && <p className="error">{emailError}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                        {phoneError && <p className="error">{phoneError}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {passwordError && <p className="error">{passwordError}</p>}
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;
