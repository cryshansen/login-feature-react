
import {  Link } from "react-router-dom";



export default function HomePage({ darkMode }) {

    return (
      <>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
          <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="mx-auto h-10 w-auto"
          />
       </div>
        <div className="text-center mt-10">
          <p className="text-base font-semibold text-indigo-400">HOME</p>
          <h1 className="mt-10 text-balance text-5xl font-semibold tracking-tight text-slate-600 sm:text-7xl">
            App Home Page
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
           Welcome to our site
          </p>
           <div className="mt-12 flex items-center justify-center gap-x-6"></div>
          <div className="mt-12 flex items-center justify-center gap-x-6">
            <Link
              to="/login"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Go to Login
            </Link>
            <Link to="#" className="text-sm font-semibold text-slate-400 hover:text-slate-300">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </>
    );
}