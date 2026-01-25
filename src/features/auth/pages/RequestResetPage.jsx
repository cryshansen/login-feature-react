
import AuthBackground from "../components/elements/AuthBackground";
import RequestResetForm from "../components/forms/RequestResetForm";

export default function RequestResetPage({ darkMode }) {
  darkMode = true; // temp for testing

  return (
    <AuthBackground darkMode={darkMode}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Reset your Password</h2>
       </div>
      
      <div
        className={`p-8 rounded shadow-sm backdrop-blur-md border mt-10 sm:mx-auto sm:w-full sm:max-w-sm border border-white/10 rounded-lg p-8 
        ${darkMode
          ? "bg-slate-900/60 "
          : "bg-gray-50 bg-gray-800 border-slate-200/70"
        }`}
      >
        <RequestResetForm darkMode={darkMode} />
      </div>
    </AuthBackground>
  );
}
