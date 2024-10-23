import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Schedule.css';

const Schedule = () => {
    const [trainings, setTrainings] = useState([]);
    const [error, setError] = useState(null);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7058/api/schedule');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setTrainings(data);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error);
            }
        };
        fetchData();
    }, []);

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
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No trainings available.</p>
                )}
            </div>
            <div class="fixed-bottom"><Footer /></div>
        </div>
    );
};

export default Schedule;
