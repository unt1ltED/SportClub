import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [changePasswordMode, setChangePasswordMode] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userProfile = JSON.parse(storedUser);
            setProfile(userProfile);
            fetchBookings(userProfile.id);
            console.log(userProfile.id);
        }
        setLoading(false);
    }, []);

    const fetchBookings = async (clientId) => {
        console.log("Fetching bookings for client ID:", clientId);
        if (clientId) {
            try {
                const res = await axios.get(`https://localhost:7058/api/schedule/client/${clientId}`);
                console.log("Bookings response:", res.data);
                setBookings(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch bookings');
                console.error("Fetch error:", err);
            }
        }
    };

    const handleEditClick = () => {
        setUpdatedProfile({ ...profile });
        setEditMode(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const res = await axios.put('https://localhost:7058/api/profile', updatedProfile);
            setProfile(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setEditMode(false);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while saving');
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await axios.put('https://localhost:7058/api/profile/change-password', {
                newPassword,
            });
            alert('Password changed successfully');
            setChangePasswordMode(false);
            setNewPassword('');
            setConfirmPassword('');
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while changing password');
        }
    };

    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <>
            <Header />
            <div className="profile">
                <h2>Your Profile</h2>
                {editMode ? (
                    <div className="user-info">
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={updatedProfile.username || ''}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={updatedProfile.email || ''}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Phone:
                            <input
                                type="text"
                                name="phoneNumber"
                                value={updatedProfile.phoneNumber || ''}
                                onChange={handleChange}
                            />
                        </label>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                ) : (
                    <div className="user-info">
                        <p>Username: {profile.username || 'N/A'}</p>
                        <p>Email: {profile.email || 'N/A'}</p>
                        <p>Phone: {profile.phoneNumber || 'N/A'}</p>
                        <button onClick={handleEditClick}>Edit Profile</button>
                        <button onClick={() => setChangePasswordMode(true)}>Change Password</button>
                    </div>
                )}

                {changePasswordMode && (
                    <div>
                        <h3>Change Password</h3>
                        <label>
                            New Password:
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </label>
                        <label>
                            Confirm New Password:
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>
                        <button onClick={handleChangePassword}>Change Password</button>
                        <button onClick={() => setChangePasswordMode(false)}>Cancel</button>
                    </div>
                )}

                <div className="bookings">
                    <h3>Your Bookings</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date and Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>{booking.title}</td>
                                        <td>{new Date(booking.dateTime).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">No bookings found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="fixed-bottom"><Footer /></div>
        </>
    );
};

export default Profile;
