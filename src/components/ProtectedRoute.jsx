import { Navigate, Outlet, useLocation } from "react-router-dom";
import { hasRole, isAuthenticated } from "../services/authService.js";

export default function ProtectedRoute({ allowedRoles }) {
  const location = useLocation();
  if (!isAuthenticated()) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (allowedRoles && !hasRole(allowedRoles)) return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
}
