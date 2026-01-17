

 export default function AuthFacingFooter({darkMode}){
    return (
        <>
         {/* Footer */}
            <footer
                className={`w-full bg-slate-900 text-slate-300 text-center py-4 transition-colors duration-300 ${
                darkMode
                    ? "bg-brand2-secondary text-brand2-text-secondary"
                    : "bg-brand1-secondary text-brand1-text-secondary"
                }`}
            >
                &copy; 2025 Auth Feature by artog.co
            </footer>
         </>
    );
}