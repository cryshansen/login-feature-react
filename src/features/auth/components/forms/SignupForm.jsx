import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function SignupForm({ darkMode }) {
  
  const navigate = useNavigate();

  const user = { firstname:"Bob",lastName:"Smith", email:"test@test.com", password:1234 }
  const [firstName, setFirstName] = useState(user?.firstname || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState(null);
  darkMode = true; // temp for testing



  const passwordsMatch = password.length > 0 && confirm.length > 0 && password === confirm;
  //clearAuthMessage();

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
                 <div>
                   <label className="block mb-1 text-sm font-medium text-gray-100">
                     Password
                   </label>
           
                   <div className="relative">
                     <input
                       type={showPassword ? "text" : "password"}
                       value={password}
                       autoComplete="on"
                       onChange={(e) => setPassword(e.target.value)}
                       className="block w-full rounded-md bg-white/5 px-3 py-1.5 pr-10
                         text-base text-white outline outline-1 -outline-offset-1 outline-white/10
                         placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2
                         focus:outline-indigo-500 sm:text-sm/6"
                     />
           
                     <button
                       type="button"
                       onClick={() => setShowPassword((v) => !v)}
                       className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent
                         text-gray-400 hover:text-gray-200"
                     >
                       {showPassword ? (
                         <EyeSlashIcon className="h-5 w-5" />
                       ) : (
                         <EyeIcon className="h-5 w-5" />
                       )}
                     </button>
                   </div>

                 </div>
                  {/* Confirm Password */}

                <div className="mt-4">
                  <label className="block mb-1 text-sm font-medium text-gray-100">
                    Confirm Password
                  </label>
        
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirm}
                      autoComplete="on"
                      onChange={(e) => setConfirm(e.target.value)}
                      className={`block w-full rounded-md bg-white/5 px-3 py-1.5 pr-10
                        text-base text-white outline outline-1 -outline-offset-1 outline-white/10
                        placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2
                        sm:text-sm/6
                        ${
                          confirm && !passwordsMatch
                            ? "outline-red-400 focus:outline-red-400"
                            : "focus:outline-indigo-500"
                        }`}
                    />
        
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent
                        text-gray-400 hover:text-gray-200"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                </div>

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
