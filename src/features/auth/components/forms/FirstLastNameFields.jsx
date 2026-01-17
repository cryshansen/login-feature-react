

export default function FirstLastNameFields({
  darkMode,
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
}) {

    return (
        <>
        {/* Name Section */}

              <h2 className="text-lg font-medium text-white">Name</h2>
              <input
                      placeholder="Firstname"
                      value={firstName}
                      onChange={(e) => onFirstNameChange(e.target.value)}
                      className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        
                        ${darkMode
                          ? "bg-slate-700"
                          : "bg-white"
                        }     
                        `}
                    />
              <input
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => onLastNameChange(e.target.value)}
                      className={`block w-full rounded bg-white/5
                                  px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 
        
                        ${darkMode
                          ? "bg-slate-700"
                          : "bg-white"
                        }   
                        `}
                    />
      
      
              
        </>        
    );
}