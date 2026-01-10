import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";

import AuthBackground from "../components/elements/AuthBackground";
import { useAuth } from "../../../context/AuthContext";

export default function ConfirmEmailPage({darkMode}) {
  const [searchParams] = useSearchParams();
  const tokenUrl = searchParams.get("token");
  const email =  searchParams.get("email");
//verifyEmail page. TODO: integrate with api. need params from email link to confirm on page landing.

 const { verifyEmailAccount, authMessage, authReady, setAuthMessage } = useAuth();
 
  const [error, setError] = useState(null);
  const captchaToken="ABVCret_45FDSxs_23Rtfs" //captcha blocking bot access essentially / could be cloudfare
  const isLoading = !authMessage && !error;

  const hasRunRef = useRef(false);
  useEffect(() => {
     if (hasRunRef.current) return;
      hasRunRef.current = true;
    // 1. Validate URL params
    if (!tokenUrl || !email) {
      setAuthMessage({
        type: "error",
        text: "Invalid or expired verification link. Please contact support.",
      });
      return;
    }

    // 2. Call API
   const runVerification = async () => {

      try {
        
          await  verifyEmailAccount({ email, tokenUrl,  token:captchaToken });
    
      } catch (err) {
          setError(err.message);
      }
   };
    
   runVerification();

  }, []);

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
        {/* Status message */}
        {authMessage && (
          <p
            className={`text-sm ${
              authMessage.type === "error"
                ? "text-red-400"
                : "text-indigo-400"
            }`}
          >
            {authMessage.text}
          </p>
        )}
        {error && (
          <div className="p-3 rounded bg-red-100 text-red-800">
            {error}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <>
            <h1 className="mt-4 text-3xl font-semibold text-white">
              Confirming your email…
            </h1>
            <p className="text-gray-400 mt-2">Please wait</p>
            <p className="mt-6 text-lg text-gray-400">
              Please wait.
            </p>
          </>
        )}

        {/* Success */}
        {authMessage?.type === "success" && (
          <>
            <p className="text-base font-semibold text-indigo-400">OK!</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">
              Your Email is Confirmed
            </h1>
            <p className="mt-6 text-lg text-gray-400">
              Your account is now active. You can log in.
            </p>

            <div className="mt-10 flex justify-center gap-x-6">
              <Link
                to="/login"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400"
              >
                Go to login
              </Link>
            </div>
          </>
        )}

        {/* Failure */}
        { authMessage?.type === "error" && (
          <>
            <p className="text-base font-semibold text-orange-400">OUCH!</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white text-amber-300">
              We're Having Issues
            </h1>
            <p className="mt-6 text-lg text-gray-400">
              Your account is cant be validated.
            </p>

            <div className="mt-10 flex justify-center gap-x-6">
              <div className="mt-10">
                <Link to="#" className="text-sm font-semibold text-white">
                  Contact support →
                </Link>
              </div>
            </div>
          </>
          
        )}
      </div>
    </AuthBackground>
  );
}