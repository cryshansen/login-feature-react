import React, { useState } from "react";
import { Link  } from 'react-router-dom';

//import FrontFacingHeader from "../Layout/FrontFacingHeader";


export default function AuthBackground({ children, darkMode }) {


  return (
    <>
    <div
      className={`min-h-screen flex items-center justify-center relative bg-gray-800  ${
        darkMode
          ? " text-white" : "text-gray-900 "}
      }`}
    >
      {/* bubble pattern */}
      {/* <div className="absolute top-[-10%] left-[5%] w-[280px] h-[280px] rounded-full bg-white/20 blur-3xl"></div> */}
      {/* <div className="absolute top-[20%] left-[70%] w-[240px] h-[240px] rounded-full bg-indigo-200/30 blur-2xl"></div>
      <div className="absolute bottom-[-12%] left-[15%] w-[300px] h-[300px] rounded-full bg-indigo-300/20 blur-3xl"></div> */}

      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
    </>
  );
}
