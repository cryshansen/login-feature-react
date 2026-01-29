// features/auth/routes/auth.routes.jsx
import { Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import VerifiedRoute from "./VerifiedRoute";
import RoleRoute from "./RoleRoute";

import AuthLayout from "../components/layout/AuthLayout";
import UnAuthLayout from "../components/layout/UnAuthLayout";

import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ConfirmEmailPage from "../pages/ConfirmEmailPage";
import RequestResetPage from "../pages/RequestResetPage";
import ConfirmResetPage from "../pages/ConfirmResetPage";
import ProfilePage from "../pages/ProfilePage";
import AdminPage from "../pages/AdminPage";
import AuthNotFoundPage from "../pages/AuthNotFoundPage";

export function AuthRoutes({ darkMode, setDarkMode }) {
  return (
    <>
      {/* =====================
          AUTH / PUBLIC PAGES
      ===================== */}
      <Route element={<UnAuthLayout darkMode={darkMode} setDarkMode={setDarkMode} />}>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage darkMode={darkMode} />} />
          <Route path="/signup" element={<SignupPage darkMode={darkMode} />} />
          <Route path="/reset" element={<RequestResetPage darkMode={darkMode} />} />
          <Route path="/reset/confirm" element={<ConfirmResetPage darkMode={darkMode} />} />
        </Route>

        {/* Email verification must stay public */}
        <Route path="/verify" element={<ConfirmEmailPage darkMode={darkMode} />} />
      </Route>

      {/* =====================
          PROTECTED AUTH PAGES
      ===================== */}
      <Route element={<AuthLayout darkMode={darkMode} setDarkMode={setDarkMode} />}>
        <Route element={<ProtectedRoute />}>
          <Route element={<VerifiedRoute />}>
            <Route path="/profile" element={<ProfilePage darkMode={darkMode} />} />

            <Route element={<RoleRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Route>
        </Route>
      </Route>

      {/* =====================
          AUTH SYSTEM ROUTES
      ===================== */}
      <Route path="/auth-unauthorized" element={<AuthNotFoundPage darkMode={darkMode} />} />
      <Route path="/auth-not-found" element={<AuthNotFoundPage darkMode={darkMode} />} />
    </>
  );
}
