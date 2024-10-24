import React from 'react';
import AssignCoach from '../components/AssignCoach';

const AdminPanel = () => {
    return (
        <div>
            <h1>Admin Panel</h1>
            <p>Welcome, Admin! Here you can manage users, courses, and more.</p>
            <AssignCoach/>
        </div>
    );
};

export default AdminPanel;
