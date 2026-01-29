import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GuardLoader from "./GuardLoader";

/**
 * 🚫 PublicOnlyRoute
 *
 * Guards routes that should ONLY be accessible
 * when the user is NOT authenticated.
 *
 * Examples:
 * - /login
 * - /signup
 * - /forgot-password
 * - /reset/confirm
 *
 * Behavior:
 * - If authenticated → redirect to /profile
 * - If NOT authenticated → allow access via <Outlet />
 */
export default function PublicOnlyRoute() {
const { authuser, authReady } = useAuth();


 
// Prevent redirect flicker while auth state initializes
  if (!authReady) {
    return <GuardLoader />;
  }
  // Logged-in users should not see auth forms
  if (authuser) {
    return <Navigate to="/profile" replace />;
  }


  // User is logged out → allow access
  return <Outlet />;
}
