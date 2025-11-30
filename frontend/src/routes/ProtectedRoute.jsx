import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    
    // Check if token cookie exists
    const hasToken = document.cookie.includes("token=");

    if (!hasToken) {
        return <Navigate to="/user/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
