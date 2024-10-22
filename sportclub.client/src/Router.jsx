import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SocialMediaLinks from './pages/SocialMediaLinks';
import Tariffs from './pages/Tariffs';
import Schedule from './pages/Schedule';
import Profile from "./pages/Profile";
import AdminPanel from './pages/AdminPanel';
import CoachPanel from './pages/CoachPanel';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role) {
            const parsedRole = JSON.parse(role);
            setUserRole(parsedRole);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<App setUserRole={setUserRole} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/social-media" element={<SocialMediaLinks />} />
                <Route path="/tariffs" element={<Tariffs />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/profile" element={<Profile />} />

                <Route
                    path="/adminpanel"
                    element={
                        <ProtectedRoute
                            userRole={userRole}
                            allowedRoles={['Admin']}
                            element={<AdminPanel />}
                        />
                    }
                />
                <Route
                    path="/coachpanel"
                    element={
                        <ProtectedRoute
                            userRole={userRole}
                            allowedRoles={['Coach']}
                            element={<CoachPanel />}
                        />
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
