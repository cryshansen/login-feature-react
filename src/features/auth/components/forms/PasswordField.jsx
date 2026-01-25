import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
/**
 * 
 * @param {darkMode="bolean", label="Password",value+"",onChange="{e.target.value}", error, autocomplete ="current-password"} param0 
 * @returns 
 */
export default function PasswordInput({
    darkMode,
    label,
    value,
    onChange,
    error,
    autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="">
      {/* Label */}
      <label className="block mb-1 text-sm font-medium text-gray-100">
        {label}
      </label>
        <div className="relative">
            {/* Input */}
            <input
                type={showPassword ? "text" : "password"}
                value={value}
                autoComplete={autoComplete}
                onChange={(e) => onChange(e.target.value)}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 pr-10
                text-base text-white outline outline-1 -outline-offset-1 outline-white/10
                placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2
                sm:text-sm/6
                ${
                    error
                    ? "outline-red-400 focus:outline-red-400"
                    : "focus:outline-indigo-500"
                }
                `}
            />

            {/* Eye toggle */}
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-1 right-0 flex items-center bg-transparent py-3 px-3 text-gray-400 hover:text-gray-200"
            >
                {showPassword ? (
                <EyeIcon className="h-5 w-5" />
                ) : (
                <EyeSlashIcon className="h-5 w-5" />              
                )}
            </button>
        </div>
      {/* Error text */}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
