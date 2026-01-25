
import { useState } from "react";

import { useAuth } from "../../../../context/AuthContext";

export default function RequestResetForm({ darkMode }) {

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