import React from "react";

import EmailField from "./EmailField";

export default function RequestResetForm({ darkMode }) {

const handleSubmit = async (e) => {
    e.preventDefault();
   
  };
    return (
        <form className="space-y-6" onSubmit={ handleSubmit }>
            <EmailField darkMode={darkMode} />
            <button 
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm 
              hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
            >
              Send Reset Link
            </button>
        </form>
    );
}