import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Schedule.css';
import axios from 'axios';

const Schedule = () => {
    const [trainings, setTrainings] = useState([]);
    const [bookedTrainings, setBookedTrainings] = useState([]);
    const [error, setError] = useState(null);

    const itemsPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7058/api/schedule');
                setTrainings(response.data);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.response ? error.response.data : { message: error.message });
            }
        };
        fetchData();
    }, []);


    const handleBook = async (trainingId) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.id) {
                throw new Error('User not found or not logged in');
            }

            const response = await axios.post(`https://localhost:7058/api/schedule/${trainingId}/book`, {
                clientId: user.id
            });

            console.log("Booking response:", response.data);

            setTrainings(prevTrainings =>
                prevTrainings.map(training =>
                    training.id === trainingId
                        ? { ...training, bookedSlots: training.bookedSlots + 1 }
                        : training
                )
            );

            setBookedTrainings(prev => [...prev, trainingId]);

        } catch (error) {
            console.error('Booking error:', error);
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
        }
    };


    if (error) {
        return <div className="error">Error: {error.message}</div>;
    }

    return (
        <div className="schedule container-fluid p-0">
            <Header />
            <div className="wrapper">
                <h2 className="schedule-title text-center mb-4">Training Schedule</h2>
                {trainings.length > 0 ? (
                    <div className="training-list">
                        {trainings.slice(0, itemsPerPage).map((training) => (
                            <div className="training-card" key={training.id}>
                                <h3 className="training-title">{training.title}</h3>
                                <p className="training-date">
                                    {new Date(training.dateTime).toLocaleString()}
                                </p>
                                <p className="training-capacity">
                                    Capacity: {training.capacity} - Booked Slots: {training.bookedSlots}
                                </p>
                                <button
                                    onClick={() => handleBook(training.id)}
                                    className={`btn btn-primary ${bookedTrainings.includes(training.id) ? 'disabled' : ''}`}
                                    disabled={bookedTrainings.includes(training.id)}
                                >
                                    {bookedTrainings.includes(training.id) ? "Already Booked" : "Sign up"}
                                </button>

                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No trainings available.</p>
                )}
            </div>
            <div className="fixed-bottom">
                <Footer />
            </div>
        </div>
    );
};

export default Schedule;
