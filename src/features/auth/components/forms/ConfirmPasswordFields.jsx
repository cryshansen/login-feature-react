import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import PasswordRules from "./PasswordRules";
import {getPasswordRules} from "../utils/passwordRules";

import PasswordStrengthMeter from "./PasswordStrengthMeter";


export default function ConfirmPasswordFields({
  password,
  setPassword,
  confirm,
  setConfirm,
  showConfirm = true,
  strength,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  const rules = getPasswordRules(password, confirm);


  const passwordsMatch = password && confirm && password === confirm;

  return (
    <>
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
            onFocus={() => setTouched(true)}
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
        <PasswordStrengthMeter strength={strength} />
      </div>

      {/* Confirm Password */}
      {showConfirm && (
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

          {password && (

            <PasswordRules rules={rules} />

          )}
        </div>
      )}
    </>
  );
}
