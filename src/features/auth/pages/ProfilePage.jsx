import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthBackground from "../components/elements/AuthBackground";
import FirstLastNameFields from "../components/forms/FirstLastNameFields";
import EmailField from "../components/forms/EmailField";

import {useAuth} from "../../../context/AuthContext";

export default function ProfilePage({ darkMode }) {
   const navigate = useNavigate();
  darkMode = true; // temp for testing
  //const user = { firstname:"Bob",lastName:"Smith", email:"test@test.com", password:'' }
   

  //usercontexts use with authContext 
  const {
    user,
    requestPasswordReset,
    authMessage,
    clearAuthMessage,
  } = useAuth();

  //Parent owns the State for the form fields
    const [firstName, setFirstName] = useState(user?.firstName ?? "");
    const [lastName, setLastName] = useState(user?.lastName ?? "");
    const [newEmail, setNewEmail] = useState("");
    const [error, setError] = useState(null);
    const fakeUser = { firstname:"Bob",lastName:"Smith", email:"test@test.com", password:'' }
    const userTest = fakeUser.email; // for testing without auth

   const handleEmailChange = async () => {
      //requestEmailChange({ email: user.email }) // needs new and old email so can switch and trace tag in kanban

      setError(null);
      clearAuthMessage();

    try {
    
       navigate("/profile", { replace: true });
   
      setNewEmail("");
    } catch (err) {
      setError(err.message);
    }
   };

   const handlePasswordReset = async () => {

    setError(null);
    clearAuthMessage();

    try {
      await requestPasswordReset({  email: userTest });
      navigate("/profile", { replace: true });
   
    } catch (err) {
      setError(err.message);
    }


   };
   const handleProfileSave = async () => {
    //update profile logic
      setError(null);
      clearAuthMessage();

    try {
     
      navigate("/profile", { replace: true });
   
    } catch (err) {
      setError(err.message);
    }



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
        {/* Messages */}
           {authMessage && (
            <div className="p-3 rounded bg-green-100 text-green-800">
              {authMessage.text}
            </div>
          )}

          {error && (
            <div className="p-3 rounded bg-red-100 text-red-800">
              {error}
            </div>
          )}
          <div className={`max-w-xl space-y-8 p-6 rounded-lg shadow-sm backdrop-blur-md border bg-slate-900 border-white/20`}>
      
            {/* Name Section */}
            <section className="space-y-4 ">
             <FirstLastNameFields 
                darkMode={darkMode} 
                firstName={firstName}
                lastName={lastName}
                onFirstNameChange={setFirstName}
                onLastNameChange={setLastName}
              />
      
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
                Current email: <strong>{userTest}</strong>
              </p>
               <EmailField 
                  darkMode={darkMode} 
                  email={newEmail}
                  onChange={setNewEmail}
               />
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
