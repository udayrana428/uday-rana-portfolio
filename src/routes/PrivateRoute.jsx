// routes/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();

  // Wait for Redux hydration if you added a loading flag
  if (isLoading) return <div>Loading...</div>;

  // Not authenticated? Redirect to sign in
  if (!user?._id) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles specified, check that user role matches
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />; // Or /unauthorized
  }

  // Authenticated and correct role
  //   return children;
  return <Outlet />;
};

export default PrivateRoute;
