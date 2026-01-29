import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';

import {AuthRoutes} from "../features/auth/routes/auth.routes";

import NotFoundPage from './pages/NotFoundPage';

function AppRouter() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Routes>

      {/* Feature routes */}
      {AuthRoutes({ darkMode, setDarkMode })}

      {/* =====================
          SYSTEM ROUTES
      ===================== */}

      <Route path="/not-found" element={<NotFoundPage darkMode={darkMode} />} />

      {/* Root */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/home" replace />} />

    </Routes>
  );
}

export default AppRouter;
