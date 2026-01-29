import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GuardLoader from "./GuardLoader";

export default function VerifiedRoute() {
  const { authuser, authReady } = useAuth();

  if (!authReady) return <GuardLoader />;

  if (!authuser?.emailVerified) {
    return <Navigate to="/verify" replace />;
  }

  return <Outlet />;
}
