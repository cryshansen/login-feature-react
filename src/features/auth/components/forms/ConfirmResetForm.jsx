import  { useState } from "react";
import { useSearchParams } from "react-router-dom";


import ConfirmPasswordFields from "./ConfirmPasswordFields";
import PasswordInput from "./PasswordField";

import { useAuth } from "../../context/AuthContext";
import {getPasswordStrength} from "../utils/passwordStrength";

export default function ConfirmResetForm({ darkMode }) {

  const [searchParams] = useSearchParams();
  const tokenUrl = searchParams.get("token");
  const email =  searchParams.get("email");


  const { resetPassword, authMessage, clearAuthMessage } = useAuth();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [token, setToken] = useState(""); //captcha token
  const [error, setError] = useState(null);

  const strength = getPasswordStrength(password);

  const passwordsMatch = password === confirm && password.length > 0;

  const canSubmit =
    passwordsMatch &&
    strength.score >= 3;

  //TODO: if current password = user.password then allow through 
  const handleSubmit = async (e) => {

     e.preventDefault();

     if(!canSubmit){
        setError("The password strength score must be atleast 3. Please adjust your password.")
        return ;
      }


     clearAuthMessage();
     setError(null);
     setToken("8YUzw_tjotM_oqt9_8XxI"); //not taking effect

     try {
          await resetPassword({ email, password, confirm, tokenUrl, token });
     } catch (error) {
       setError(error.message);
     }

  };

  return (
    <>
      {authMessage && (
        <div className="space-y-3">
          <div role="status" className="p-3 rounded bg-green-100 text-green-800">
            {authMessage.text}
          </div>
        </div>
      )}
      {error && (
          <div role="error" className="p-3 rounded bg-red-100 text-red-800">
            {error}
          </div>
        )}

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
              name="reset"
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
        </>
  );
}
