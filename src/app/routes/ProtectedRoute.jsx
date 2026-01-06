
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * 🔒 ProtectedRoute
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
  const { isAuthenticated, authReady } = useAuth();

  // Prevent redirect flicker while auth state initializes
  if (!authReady) {
    return <div>Loading...</div>;
  }

  // Block unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated → render protected page
  return <Outlet />;
}
