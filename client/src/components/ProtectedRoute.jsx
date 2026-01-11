import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return <Navigate to="/login" />;

    // Check if role is required and if user has that role
    if (role && user.role !== role) {
        // Redirect to appropriate dashboard based on actual role
        if (user.role === 'admin') return <Navigate to="/admin" />;
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;