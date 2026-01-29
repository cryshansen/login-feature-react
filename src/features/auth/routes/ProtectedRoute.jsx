
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GuardLoader from "./GuardLoader";

/**
 * 🔒 ProtectedRoute  RequireAuth.test.jsx runs against this froute
 *
 * Guards routes that REQUIRE authentication.
 *
 * Examples:
 * - /profile
 * - /settings
 * - /dashboard
 *
 * Behavior:
 * - While auth state is loading → show fallback
 * - If NOT authenticated → redirect to /login
 * - If authenticated → allow access via <Outlet />
 */
export default function ProtectedRoute() {
  const { authReady, authuser } = useAuth();

  // Prevent redirect flicker while auth state initializes
  if (!authReady) {
    return <GuardLoader />;
  }

  // User is authenticated → render protected page
  return authuser ? <Outlet /> : <Navigate to="/login" replace />;
}
