import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";
import VerifiedRoute from "./routes/VerifiedRoute";
import RoleRoute from "./routes/RoleRoute";


import AuthLayout from '../features/auth/components/layout/AuthLayout';
import UnAuthLayout from '../features/auth/components/layout/UnAuthLayout';
import LoginPage from '../features/auth/pages/LoginPage';
import SignupPage from '../features/auth/pages/SignupPage';
import ConfirmEmailPage from '../features/auth/pages/ConfirmEmailPage';
import RequestResetPage from '../features/auth/pages/RequestResetPage';
import ConfirmResetPage from '../features/auth/pages/ConfirmResetPage';
import NotFoundPage from '../features/auth/pages/NotFoundPage';
import ProfilePage from '../features/auth/pages/ProfilePage';
import AdminPage from "../features/auth/pages/AdminPage";


function AppRouter() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Routes>

      {/* =====================
          AUTH / PUBLIC PAGES
      ===================== */}
      <Route element={<UnAuthLayout darkMode={darkMode} setDarkMode={setDarkMode} />}>
        
        {/* Public-only */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage darkMode={darkMode} />} />
          <Route path="/signup" element={<SignupPage darkMode={darkMode} />} />

          {/* Password reset */}
          <Route path="/reset" element={<RequestResetPage darkMode={darkMode} />} />
          <Route path="/reset/confirm" element={<ConfirmResetPage darkMode={darkMode} />} />
        </Route>

        {/* Email verification MUST be accessible */}
        <Route path="/verify" element={<ConfirmEmailPage darkMode={darkMode} />} />

      </Route>

      {/* =====================
          PROTECTED ROUTES
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
          SYSTEM ROUTES
      ===================== */}
      <Route path="/unauthorized" element={<NotFoundPage darkMode={darkMode} />} />
      <Route path="/not-found" element={<NotFoundPage darkMode={darkMode} />} />

      {/* Root */}
      <Route path="/" element={<Navigate to="/profile" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default AppRouter;
