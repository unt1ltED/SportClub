import React from 'react';
import AssignCoach from '../components/AssignCoach';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/panelStyles.css'

const AdminPanel = () => {
    return (
        <div>
            <Header/>
            <h1>Admin Panel</h1>
            <div className="panel">
                <AssignCoach />

            </div>
            <div className="fixed-bottom">
                <Footer />
            </div>
        </div>
    );
};

export default AdminPanel;
