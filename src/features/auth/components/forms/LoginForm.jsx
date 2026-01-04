import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import PasswordField from "./PasswordField";

export default function LoginForm({ darkMode }) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
   
    
  };

 
  return (

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                  Email address
              </label>
              <div className="mt-2">
                  <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
              </div>
            </div>
            <PasswordField
              label="Password"
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            <div className="flex items-center ">
                  <input  id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 border rounded border border-white/10 bg-white/5 text-indigo-500 accent-indigo-500 focus:-outline-offset-2 focus:outline-indigo-500 hover:bg-indigo-500"/>
                  <label htmlFor="checked-checkbox" className="select-none ms-2 text-sm font-medium text-heading text-white">Remember me.</label>
                  <div className="text-sm flex-1 text-right">
                      <Link to="/reset" className="font-semibold text-indigo-400 hover:text-indigo-300">
                          Forgot password?
                      </Link>
                  </div>
              </div>
            <div>
              <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                  Sign in
              </button>
              </div>
          </form>
  );
}
