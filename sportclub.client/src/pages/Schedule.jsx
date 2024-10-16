import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Schedule() {
    return (
        <>
            <Header />
            <div className="schedule-page">
                <h1>Training Schedule</h1>
                <p>Find the perfect time for your training sessions!</p>
                <table>
                    <tr><th>Day</th><th>Time</th><th>Activity</th></tr>
                    <tr><td>Monday</td><td>9:00 AM - 11:00 AM</td><td>Yoga</td></tr>
                    <tr><td>Tuesday</td><td>6:00 PM - 8:00 PM</td><td>Weightlifting</td></tr>
                </table>
            </div>
            <Footer />
        </>
    );
}

export default Schedule;
