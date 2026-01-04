import React from "react";

import { Outlet } from "react-router-dom";


import HeaderTopLevel from "./HeaderTopLevel";
import AuthFacingHeader from "./AuthFacingHeader";
import AuthFacingFooter from "./AuthFacingFooter";


export default function AuthLayout({  darkMode, setDarkMode }) {

  darkMode = true; // temp for testing
  return (
    <div className="min-h-screen flex flex-col w-screen">
      <HeaderTopLevel darkMode={darkMode} />
      <AuthFacingHeader darkMode={darkMode}  setDarkMode={setDarkMode} />
      
      <main className={`flex-1 w-full  ${darkMode ? "bg-slate-800 text-slate-100" : "bg-slate-100 text-slate-900"} bg-slate-800`}>
      {/* <div className="flex flex-1 w-full"> */}
          <div className={` ${darkMode ? "bg-slate-800 text-slate-100" : "bg-slate-100 text-slate-900"} `}>
              <Outlet /> {/* ✅ Child routes render here */}
          </div>
        {/* </div> */}
      </main>
  
      <AuthFacingFooter />
    </div>
  );
}
