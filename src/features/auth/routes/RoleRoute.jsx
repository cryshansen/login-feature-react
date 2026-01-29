import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GuardLoader from "./GuardLoader";

export default function RoleRoute({ allowedRoles }) {
  const { authuser, authReady } = useAuth();

  if (!authReady) return <GuardLoader />;

  if (!allowedRoles.includes(authuser?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
