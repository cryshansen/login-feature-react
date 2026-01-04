import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ConfirmPasswordFields from "./ConfirmPasswordFields";

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

  const handleSubmit = async (e) => {
   
  };

  return (
  

        <form className="space-y-5 " onSubmit={handleSubmit}>

          {/* Name First, Last  */}
          <div>
            <label className="block mb-1 font-medium block text-sm/6 font-medium text-gray-100">Firstname</label>

            <input
                placeholder="Firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
  
                  ${darkMode
                    ? "bg-slate-700"
                    : "bg-white"
                  }     
                  `}
              />
          </div>
          
          <div>
              <label className="block mb-1 font-medium block text-sm/6 font-medium text-gray-100">Lastname</label>

              <input
                placeholder="Lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`block w-full rounded bg-white/5
                            px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 
  
                  ${darkMode
                    ? "bg-slate-700"
                    : "bg-white"
                  }   
                  `}
              />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium block text-sm/6 font-medium text-gray-100">Email</label>
            <input
              type="email"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              value={email}
              autoComplete="on"
              onChange={(e) => setEmail(e.target.value)}
               
            />
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
