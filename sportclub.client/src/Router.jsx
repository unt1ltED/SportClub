import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'; // Импортируй главный компонент
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SocialMediaLinks from './pages/SocialMediaLinks';
import Tariffs from './pages/Tariffs';
import Schedule from './pages/Schedule';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/social-media" element={<SocialMediaLinks />} />
                <Route path="/tariffs" element={<Tariffs />} />
                <Route path="/schedule" element={<Schedule />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
