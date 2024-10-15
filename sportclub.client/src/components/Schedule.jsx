import React from 'react';
import '../styles/Schedule.css';

const Schedule = () => {
    return (
        <section className="schedule">
            <div className="container">
                <h2 className="section-title">Training Schedule</h2>
                <p>Explore our upcoming training sessions and book a slot today!</p>
                <button className="btn-secondary">View Schedule</button>
            </div>
        </section>
    );
};

export default Schedule;
