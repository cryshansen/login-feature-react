import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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

console.log("PublicOnlyRoute rendered - authReady:", authReady, "authuser:", authuser);
 
// Prevent redirect flicker while auth state initializes
  if (!authReady) {
    console.log("PublicOnlyRoute: authReady is false, showing loader");
    return <GuardLoader />;
  }
  // Logged-in users should not see auth forms
  if (authuser) {
    console.log("PublicOnlyRoute: User is authenticated, redirecting to /profile", authuser);
    return <Navigate to="/profile" replace />;
  }

  console.log("PublicOnlyRoute: User is logged out, allowing access");
  // User is logged out → allow access
  return <Outlet />;
}
