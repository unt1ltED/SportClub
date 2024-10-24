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

    useEffect(() => {
        const fetchBookedTrainings = async () => {
            try {
                const clientId = JSON.parse(localStorage.getItem('userid'));
                if (!clientId) {
                    throw new Error('User not found or not logged in');
                }

                const response = await axios.get(`https://localhost:7058/api/schedule/booked/${clientId}`);
                setBookedTrainings(response.data.map(training => training.trainingId));
            } catch (error) {
                console.error('Error fetching booked trainings:', error);
                setError(error.response ? error.response.data : { message: error.message });
            }
        };

        fetchBookedTrainings();
    }, []);

    const handleBook = async (trainingId) => {
        try {
            const clientId = JSON.parse(localStorage.getItem('userid'));
            if (!clientId) {
                throw new Error('User not found or not logged in');
            }

            if (bookedTrainings.includes(trainingId)) {
                alert("You are already booked for this training session.");
                return;
            }

            const bookingResponse = await axios.post(`https://localhost:7058/api/schedule/${trainingId}/book`, {
                clientId,
                trainingId
            });

            console.log("Booking response:", bookingResponse.data);

            setBookedTrainings(prev => [...prev, trainingId]);
            setTrainings(prevTrainings =>
                prevTrainings.map(training =>
                    training.id === trainingId
                        ? { ...training, bookedSlots: training.bookedSlots + 1 }
                        : training
                )
            );

        } catch (error) {
            console.error('Booking error:', error);
            setError(error.response ? error.response.data : { message: error.message });
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
                                {bookedTrainings.includes(training.id) ? (
                                    <button className="btn btn-secondary" disabled>
                                        Already booked
                                    </button>
                                ) : (
                                    <button onClick={() => handleBook(training.id)} className="btn btn-primary">
                                        Sign up
                                    </button>
                                )}
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
