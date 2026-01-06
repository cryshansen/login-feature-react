
import React, { useState } from "react";

export default function EmailField({ darkMode, email, onChange }) {

    return (

        <div>
          <label className="block mb-1 font-medium text-sm/6 text-gray-50">Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => onChange(e.target.value)}
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
       </div>
    );
}