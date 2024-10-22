import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, userRole, allowedRoles }) => {
    return allowedRoles.includes(userRole) ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
