import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import EmailField from "./EmailField";
import ConfirmPasswordFields from "./ConfirmPasswordFields";
import FirstLastNameFields from "./FirstLastNameFields";

export default function SignupForm({ darkMode }) {
  
  const navigate = useNavigate();

  const user = { firstname:"Bob",lastName:"Smith", email:"test@test.com", password:'' }
  const [firstName, setFirstName] = useState(user?.firstname || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState(null);
  darkMode = true; // temp for testing

  const passwordsMatch = password.length > 0 && confirm.length > 0 && password === confirm;
  const canSubmit = passwordsMatch && strength.score >=3 && firstName && lastName && email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(canSubmit){
       //do something
     }
  };

  return (
  

        <form className="space-y-5 " onSubmit={handleSubmit}>

          {/* Name First, Last  */}
          <FirstLastNameFields darkMode={darkMode} />
          {/* Email */}
          <div>

            <EmailField darkMode={darkMode} />
          </div>
           {/* Password */}
          <ConfirmPasswordFields
            password={password}
            setPassword={setPassword}
            confirm={confirm}
            setConfirm={setConfirm}
            showConfirm
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
  );
}
