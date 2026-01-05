import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import AuthBackground from "../components/elements/AuthBackground";

export default function ConfirmEmailPage({darkMode}) {
  

  return (
      <AuthBackground darkMode={darkMode}>
         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="mx-auto h-10 w-auto"
          />
       </div>
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-400">OK!</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Your Email is Confirmed.
          </h1>
         
          <p className="text-gray-600">Confirming your email…</p>
         
          <p className="mt-6 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
              Your account is now active. You can log in.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/login"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Go back home
            </Link>
            <Link to="#" className="text-sm font-semibold text-white">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </AuthBackground>
  );
}
