import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupForm from "../components/forms/SignupForm";

export default function SignupPage({ darkMode }) {
  return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-800">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border  border-white/10 rounded-lg p-8 bg-gray-900 backdrop-blur-sm">
              
              <SignupForm darkMode={darkMode} />

              <p className="mt-10 text-center text-sm/6 text-gray-400">
                 Already a member?{' '}
                  <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                      Login here.
                  </Link>
              </p>

          </div>
      </div>
  );
}
