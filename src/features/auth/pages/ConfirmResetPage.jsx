import React, { useState, useEffect } from "react";

import AuthBackground from "../components/elements/AuthBackground";
import ConfirmResetForm from "../components/forms/ConfirmResetForm";

export default function ConfirmResetPage({ darkMode }) {
  darkMode = true; //testing
  return (
    <AuthBackground darkMode={darkMode}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white pb-4">Set new password</h2>
       </div>
      <div
        className={`p-8 rounded-lg shadow-sm backdrop-blur-md border bg-gray-800
        ${darkMode
          ? "bg-slate-900/60 border-white/10"
          : "bg-white/70 bg-gray-800 border-slate-200/70"
        }`}
      >

         <ConfirmResetForm darkMode={darkMode} />
        </div>
    </AuthBackground>
  );
}
