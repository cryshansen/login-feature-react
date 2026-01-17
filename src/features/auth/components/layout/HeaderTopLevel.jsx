
import { PhoneIcon } from "@heroicons/react/24/outline";
import AccountDropdown from "../elements/AccountDropdown";
import DarkModeButton from "../elements/DarkModeButton";


export default function HeaderTopLevel({
  darkMode,
  setDarkMode,
  isLoggedIn,
  logout,
}) {

  return (
    <header
      className={`
        w-full text-sm
        ${darkMode ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-700"}
        border-b border-black/5
      `}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-10 items-center justify-between">
          {/* Left: Phone */}
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-4 w-4 text-gray-500" />
            <a
              href="tel:18001234567"
              className="hover:underline hidden sm:inline"
            >
              1-800-123-4567
            </a>
          </div>

          {/* Right: Account + Dark Mode */}
          <div className="flex items-center gap-2">
            <AccountDropdown
              darkMode={darkMode}
              isLoggedIn={isLoggedIn}
              logout={logout}
            />
            <DarkModeButton
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
