import React from 'react';
import AssignCoach from '../components/AssignCoach';
import Header from '../components/Header';
import Footer from '../components/Footer';


const AdminPanel = () => {
    return (
        <div>
            <Header/>
            <h1>Admin Panel</h1>
            <AssignCoach />
            <div className="fixed-bottom">
                <Footer />
            </div>
        </div>
    );
};

export default AdminPanel;
