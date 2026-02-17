import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // If authentication is required and user is not logged in
  if (requireAuth && !user) {
    // Redirect to login page with the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in and trying to access login/register pages
  if (!requireAuth && user) {
    // Redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute; 