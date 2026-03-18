import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
    const { isAuthenticated, hasRole } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.some(role => hasRole(role))) {
        // If authenticated but doesn't have the right role, send them home
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
