import React, { useState, useEffect } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";


import ConfirmPasswordFields from "./ConfirmPasswordFields";
import PasswordInput from "./PasswordField";

import { useAuth } from "../../../../context/AuthContext";
import {getPasswordStrength} from "../utils/passwordStrength";

export default function ConfirmResetForm({ darkMode }) {

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email =  searchParams.get("email");
  const navigate = useNavigate();
  const { resetPassword, clearAuthMessage } = useAuth();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState(null);

  const strength = getPasswordStrength(password);

  const passwordsMatch = password === confirm && password.length > 0;

const canSubmit =
  passwordsMatch &&
  strength.score >= 3 &&
  firstName &&
  lastName &&
  email;

  const handleSubmit = async (e) => {
    //console.log(email + " " + pw + " " +  confirm  + " " + token);
     e.preventDefault();
     clearAuthMessage();
     setError(null);
     clearAuthMessage();
     try{
          await resetPassword({ email, currentPassword, password, confirm, token });
          navigate("/login", { replace: true });
     }catch (err) {
       setError(err.message);
     }

  };


  return (

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Current password */}
            <PasswordInput
              label="Current Password"
              value={currentPassword}
              onChange={setCurrentPassword}
              autoComplete="current-password"
            />

            {/* New password */}
            <ConfirmPasswordFields darkMode={darkMode}
                    password={password}
                    setPassword={setPassword}
                    confirm={confirm}
                    setConfirm={setConfirm}
                    showConfirm={true}
                    strength={strength}
                  />

            <button
              type="submit"
              disabled={!passwordsMatch}
              className={`
                w-full py-3 rounded-xl font-semibold transition
                ${
                  passwordsMatch
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              Update Password
            </button>
        </form>
  );
}
