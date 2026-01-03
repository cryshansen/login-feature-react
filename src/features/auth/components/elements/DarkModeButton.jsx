import { Moon, Sun } from "lucide-react";

export default function DarkModeButton({ darkMode, setDarkMode }) {
  darkMode = true;
  return (


        <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-transparent transition"
            >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="hidden sm:inline">{darkMode ? "Light" : "Dark"}</span>
        </button>
  );
}