import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setProfile(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

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
            const res = await axios.put('/api/profile', updatedProfile);
            setProfile(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setEditMode(false);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while saving');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="profile">
            <Header />
            <h2>Your Profile</h2>
            {editMode ? (
                <div>
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
                <div>
                    <p>Username: {profile.username || 'N/A'}</p>
                    <p>Email: {profile.email || 'N/A'}</p>
                    <p>Phone: {profile.phoneNumber || 'N/A'}</p>
                    <button onClick={handleEditClick}>Edit Profile</button>
                </div>
            )}
            <h3>Your Bookings</h3>
            <ul>
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <li key={booking.id}>
                            {booking.trainingSession.title} with {booking.trainingSession.trainer.name} on {booking.trainingSession.dateTime}
                        </li>
                    ))
                ) : (
                    <li>No bookings found.</li>
                )}
            </ul>
            <Footer />
        </div>
    );
};

export default Profile;
