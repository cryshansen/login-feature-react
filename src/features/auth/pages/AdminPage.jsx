
import AuthBackground from "../components/elements/AuthBackground";
import {useAuth} from "../../../context/AuthContext";


export default function AdminPage({ darkMode }) {
  darkMode = true; // temp for testing
  //const user = { firstname:"Bob",lastName:"Smith", email:"test@test.com", password:'' }
  //usercontexts use with authContext 
  const {  authMessage  } = useAuth();


   return (
       <AuthBackground darkMode={darkMode}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white pb-4">Profile</h2>
       </div>
        {/* Messages */}
           {authMessage && (
            <div className="p-3 rounded bg-green-100 text-green-800">
              {authMessage.text}
            </div>
          )}

             <div className={`max-w-xl space-y-8 p-6 rounded-lg shadow-sm backdrop-blur-md border bg-slate-900 border-white/20`}>
      
            {/* Name Section */}
            <section className="space-y-4 ">
             <h3> Administrators can manage different components.</h3>
             <p>We need to also build out the calendar mangement system for bookings.</p>
             <p> We make a list of users that need access or enbable roles.</p>
            </section>
          </div>
      </AuthBackground>
   );
}
