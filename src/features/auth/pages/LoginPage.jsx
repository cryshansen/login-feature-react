import React, { useState } from "react";
import {Link} from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";


export default function LoginPage({darkMode}){

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
                    
                    <LoginForm darkMode={darkMode} />

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Not a member?{' '}
                        <Link to="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Start a 14 day free trial
                        </Link>
                    </p>
                    
 
                
                </div>
           
            </div>
    );
}