import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';

import AuthLayout from '../features/auth/components/layout/AuthLayout';
import LoginPage from '../features/auth/pages/LoginPage';
import SignupPage from '../features/auth/pages/SignupPage';
import ConfirmEmailPage from '../features/auth/pages/ConfirmEmailPage';
import RequestResetPage from '../features/auth/pages/RequestResetPage';
import ConfirmResetPage from '../features/auth/pages/ConfirmResetPage';
import NotFoundPage from '../features/auth/pages/NotFoundPage';
import ProfilePage from '../features/auth/pages/ProfilePage';



function AppRouter() {
  const [darkMode, setDarkMode] = useState(false);
  return (
     <Routes>
        <Route element={<AuthLayout  darkMode={darkMode}  setDarkMode={setDarkMode} />} >
            <Route path="/login" element={<LoginPage darkMode={darkMode} />} />
            {/** reset password section enter email for reset to be sent to.  */}
            <Route path="/reset" element={<RequestResetPage darkMode={darkMode} />} />
            {/** reset emailed link to confirm the reset similar to 2Step Auth to expose the reset form.  */}
            <Route path="/reset/confirm" element={<ConfirmResetPage darkMode={darkMode} />} /> 
            {/** end reset password section  */}
            {/** signup section  */}
            <Route path="/signup" element={<SignupPage darkMode={darkMode} />} />
            {/** lander from email link after creating account. */}
            <Route path="/confirm-email" element={<ConfirmEmailPage darkMode={darkMode} />} />
            {/** end signup section link to login */}
            {/** User Landing page   */}
            <Route path="/profile" element={<ProfilePage darkMode={darkMode} />} />
            {/** end signup section link to login */}
          </Route>
        {/* Fallback */}
        <Route path="/not-found" element={<NotFoundPage darkMode={darkMode}  />} />
        {/* wildcard catch-all */}
        <Route path="*" element={<Navigate to="/login" />} />. {/** assumes login exists at this time. */}
    </Routes>
  )
}

export default AppRouter
