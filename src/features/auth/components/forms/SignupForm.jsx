import { useState } from "react";

import EmailField from "./EmailField";
import ConfirmPasswordFields from "./ConfirmPasswordFields";
import FirstLastNameFields from "./FirstLastNameFields";


import { useAuth } from "../../../../context/AuthContext";
import {getPasswordStrength} from "../utils/passwordStrength";
/**
 * 
 * @param {*} param0 
 * @returns 
 */

export default function SignupForm({ darkMode }) {
  

  const {signup, resendConfirmation, authMessage, clearAuthMessage} = useAuth();

  
  //parent owns the State for the form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");


  const [error, setError] = useState(null);

  darkMode = true; // temp for testing
  

  const strength = getPasswordStrength(password);

  const passwordsMatch = password.length > 0 && confirm.length > 0 && password === confirm;
  const canSubmit = passwordsMatch && strength.score >=3 && firstName && lastName && email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!canSubmit){
        setError("The password strength score must be atleast 3. Please adjust your password.")
        return ;
      }
     setError(null);
     clearAuthMessage();
     try{
          await signup({ firstName, lastName, email, password, confirm });

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

          <button
            onClick={() => resendConfirmation(email)}
            className="text-sm text-purple-600 hover:underline"
          >
            Resend confirmation email
          </button>
        </div>
      )}
      {error && (
        <div className="p-3 rounded bg-red-100 text-red-800">
          {error}
        </div>
      )}


        <form className="space-y-5 " onSubmit={handleSubmit}>

          {/* Name First, Last  */}
           <FirstLastNameFields 
              darkMode={darkMode} 
              firstName={firstName}
              lastName={lastName}
              onFirstNameChange={setFirstName}
              onLastNameChange={setLastName}
            />
          {/* Email */}
          <div>
            <EmailField 
              darkMode={darkMode} 
              email={email}
              onChange={setEmail}
            />
          </div>
           {/* Password */}
          <ConfirmPasswordFields
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
            className={`flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              ${
                    passwordsMatch
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
              `}
          >
            Sign Up
          </button>
        </form>
  </>
  );
}
