
import { Link } from "react-router-dom";

import AccountDropdown from "../elements/AccountDropdown";

export default function AuthFacingHeader({darkMode, setDarkMode}){

   // const {user, logout } = useAuth();
    return (
        <>

    <header className="bg-gray-900">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
            <Link to="/" title="Login Feature Home" alt="Login Feature Home" className="-m-1.5 p-1.5">
            <span className="sr-only">Login Feature</span>
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* <a href="/login" className="text-sm/6 font-semibold text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </a> */}
           <AccountDropdown darkMode={darkMode} />
        </div>
      </nav>
 
    </header>
    </>
  );
}