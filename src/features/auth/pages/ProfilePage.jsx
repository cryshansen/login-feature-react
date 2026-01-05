import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthBackground from "../components/elements/AuthBackground";
import FirstLastNameFields from "../components/forms/FirstLastNameFields";
import EmailField from "../components/forms/EmailField";

export default function ProfilePage({ darkMode }) {
  darkMode = true; // temp for testing
   const user = { firstname:"Bob",lastName:"Smith", email:"test@test.com", password:'' }
   
   const handleEmailChange = async () => {

   };
   const handlePasswordReset = async () => {
   };
   const handleProfileSave = async () => {
   };

   return (
       <AuthBackground darkMode={darkMode}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white pb-4">Profile</h2>
       </div>

          <div className={`max-w-xl space-y-8 p-6 rounded-lg shadow-sm backdrop-blur-md border bg-slate-900 border-white/20`}>
      
            {/* Name Section */}
            <section className="space-y-4 ">
             <FirstLastNameFields darkMode={darkMode} />
      
              <button
                onClick={handleProfileSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Save name
              </button>
            </section>
      
            {/* Email Section */}
            <section className="space-y-4">
              <h2 className="text-lg font-medium">Email</h2>
      
              <p className="text-sm text-gray-600">
                Current email: <strong>{user.email}</strong>
              </p>
                 {/* <input
                    type="email"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    value={newEmail}
                    autoComplete="on"
                     onChange={(e) => setNewEmail(e.target.value)}
                  /> */}
               <EmailField darkMode={darkMode} />
              <button
                onClick={handleEmailChange}
                  className={`px-4 py-2 border rounded border-indigo-600 text-indigo-600 hover:bg-indigo-300
                   ${darkMode
                    ? "bg-slate-800"
                    : "bg-white"
                  }   
                  `}
              >
                Request email change
              </button>
            </section>
      
            {/* Password Section */}
            <section className="space-y-2">
              <h2 className="text-lg font-medium">Password</h2>
              <button
                onClick={handlePasswordReset}
                className={`text-sm text-indigo-600 hover:underline
                   ${darkMode
                    ? "bg-slate-800"
                    : "bg-white"
                  }   
                  `}
              >
                Send password reset link
              </button>
            </section>
          </div>
      </AuthBackground>
   );
}
