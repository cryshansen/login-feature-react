import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound, LogIn, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../../context/AuthContext";

export default function AccountDropdown({ darkMode }) {
  
  const navigate = useNavigate();
  const {logout, authuser, authReady} = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const isAuthenticated = authReady && authuser !== null;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () =>{
      logout(); 
      navigate("/login", {replace:true});
  
  }
  
  return (
    <div ref={menuRef} className="relative p-0">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition bg-transparent
        `}
      >
      <CircleUserRound size={20} color={darkMode ? "white" : "black"} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg p-4 z-50
              bg-gray-800 outline outline-1 -outline-offset-1 outline-white/10 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in
              ${darkMode ? "bg-slate-800 text-slate-100" : "bg-white text-blue-900"}
            `}
          >
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-400/40 dark:hover:bg-white/5"
                >
                  <div className="flex size-8 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-700">
                      <LogIn size={16} aria-hidden="true" className="size-6 text-gray-400 group-hover:text-white" />
                  </div>
                  <span className="hidden sm:inline block font-semibold text-white hover:text-indigo-500"> Login</span>
                </Link>

                <Link
                  to="/signup"
                  className="flex items-center gap-3 px-4 py-3  rounded-lg hover:bg-slate-400/40 dark:hover:bg-white/5"                >
                  <div className="flex size-8 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-white/5">
 
                    <User size={18}  className="size-6 text-gray-400 group-hover:text-white" /> 
                  </div>
                   <span className="hidden sm:inline block font-semibold text-white hover:text-indigo-500"> Create Account</span>
                </Link>
              </>
             ) : ( 
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-400/40 dark:hover:bg-white/5" 
                >
                  <div className="flex size-8 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-white/5">
 
                    <User size={18}  className="size-6 text-gray-400 group-hover:text-white" />  
                    </div>
                    <span className="hidden sm:inline block font-semibold text-white hover:text-indigo-500"> Profile</span>
                
                </Link>
                <button
                  onClick={handleLogout }
                  className="flex w-full items-center gap-3 px-4 py-3 hover:bg-red-300/20 text-red-500"
                >
                  <div className="flex size-8 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-white/5">
                    <LogOut size={18} /> 
                     
                  </div>
                  <span className="hidden sm:inline block font-semibold text-white hover:text-red-500"> Sign Out </span>
                </button>
              </>
             )} 
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
