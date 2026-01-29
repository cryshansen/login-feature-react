import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GuardLoader from "./GuardLoader";


export default function AccountStatusRoute() {
  const { authuser, authReady } = useAuth();

  if (!authReady) return <GuardLoader />;

  if (authuser?.status === "disabled") {
    return <Navigate to="/account-disabled" replace />;
  }

  if (authuser?.status === "banned") {
    return <Navigate to="/banned" replace />;
  }

  return <Outlet />;
}
