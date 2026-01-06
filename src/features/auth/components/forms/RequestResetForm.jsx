import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import EmailField from "./EmailField";


import { useAuth } from "../../../../context/AuthContext";

export default function RequestResetForm({ darkMode }) {
  const navigate = useNavigate();
  //addition of auth context.
  const { requestPasswordReset  , authMessage, clearAuthMessage } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthMessage();
    console.log(e);
    try{
      await requestPasswordReset({ email });
      navigate("/login", { replace: true });
   
    }catch (err) {
      setError(err.message);
    }
   
  };

    return (
      <>
       {authMessage && (
          <div className="space-y-3">
            <div className="p-3 rounded bg-green-100 text-green-800">
              {authMessage.text}
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded bg-red-100 text-red-800">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={ handleSubmit }>
            <EmailField darkMode={darkMode} />
            <button 
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm 
              hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
            >
              Send Reset Link
            </button>
        </form>
      </>
    );
}