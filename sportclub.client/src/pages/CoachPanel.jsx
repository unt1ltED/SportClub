import React from 'react';
import AddTraining from '../components/AddTraining';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/panelStyles.css'

const CoachPanel = () => {
    return (
        <div>
            <Header/>
            <div className='panel'>
                <h1>Coach Panel</h1>

                <p>Welcome, Coach! Here you can manage your training schedules and monitor your students.</p>

                <AddTraining />

            </div>
            <div class="fixed-bottom"><Footer /></div>
        </div>
    );
};

export default CoachPanel;
