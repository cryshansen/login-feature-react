import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  login as loginApi,
  register as registerApi,
  requestPasswordResetApi,
  confirmPasswordResetApi,
  verifyEmailApi,
  meApi,
} from "../features/api/services/auth.service";
import { AUTH_MODE } from "../config/auth.config";
import { emitAuthEvent } from "../features/api/services/authTelemetry.service";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [authuser, setAuthUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState(null);

  const IDLE_TIMEOUT = 1000 * 60 * 30; // 30 minutes

  const clearAuthMessage = () => setAuthMessage(null);



  useEffect(() => {
    console.log("AUTH STATE CHANGED:", authuser);
    // Once authuser changes after bootstrap, it means resolveSession completed
    if (authReady && authuser) {
      console.log("Auth ready and user logged in");
    }
  }, [authuser, authReady]);


  /* =====================================================
  ** Cookie /me callback // /me is the ONLY place that resolves auth identity
  ===================================================== */
  const resolveSession = useCallback(async () => {
    try {
       console.log("resolveSession: calling meApi");
       const data = await meApi();
       console.log("resolveSession: meApi response", data);
      if (!data) {
        console.log("resolveSession: no data returned, setting authuser to null");
        setAuthUser(null);
        return null;
      }

      const user = data.user ?? data;
      console.log("resolveSession: extracted user, calling setAuthUser", user);
      setAuthUser(user);
      console.log("resolveSession: returning user", user);
      // if (user && user.emailVerified === false) {
      //       setAuthMessage({
      //         type: "warning",
      //         text: "Please verify your email to continue.",
      //       });
      //   }
      return user;
    } catch (err) {
      console.log("resolveSession: caught error", err);
      setAuthUser(null);
      return null;
    }
  }, []);




  /* =====================================================
     BOOTSTRAP AUTH (COOKIE OR TOKEN)
  ===================================================== */
  useEffect(() => {
    let cancelled = false;

    const bootstrapAuth = async () => {
      try {
         const user = await resolveSession();
         console.log("bootstrapAuth: resolveSession returned", user);
        if (!cancelled && user?.emailVerified === false) {
          setAuthMessage({
            type: "warning",
            text: "Please verify your email to continue.",
          });
        }
      } catch (err) {
        console.log("bootstrapAuth: error", err);
        if(!cancelled){
          setAuthUser(null);
        }
      } finally {
        if(!cancelled){
            console.log("bootstrapAuth: setting authReady to true");
            setAuthReady(true);
        }
      }
    };

    bootstrapAuth();
    return () => (cancelled = true);
  }, [resolveSession]);


  /* =====================================================
     TOKEN MODE PERSISTENCE ONLY
  ===================================================== */
  useEffect(() => {
    if (AUTH_MODE !== "token") return;

    if (authuser) {
      localStorage.setItem("auth_user", JSON.stringify(authuser));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [authuser]);



  /* =====================================================
     TRACK GLOBAL ACTIVITY
  ===================================================== */
  useEffect(() => {
    const updateActivity = () => {
      localStorage.setItem("last_activity", Date.now());
    };

    ["mousemove", "keydown", "click", "scroll"].forEach(evt =>
      window.addEventListener(evt, updateActivity)
    );

    return () => {
      ["mousemove", "keydown", "click", "scroll"].forEach(evt =>
        window.removeEventListener(evt, updateActivity)
      );
    };
  }, []);

  /* =====================================================
     IDLE LOGOUT ENFORCEMENT
  ===================================================== */
  useEffect(() => {
    const interval = setInterval(() => {
      const last = Number(localStorage.getItem("last_activity"));
      if (!last) return;

      if (Date.now() - last > IDLE_TIMEOUT) {
        setAuthUser(null);
        localStorage.removeItem("auth_user");
        emitAuthEvent("idle_logout");
        setAuthMessage({
          type: "info",
          text: "You were logged out due to inactivity.",
        });

      }
    }, 60_000);

    return () => clearInterval(interval);
  }, []);


  /* =====================================================
     AUTH ACTIONS
  ===================================================== */


  /* ======================
      SIGNUP
  ====================== */
  const signup = async ({ firstName, lastName, email, password, confirm }) => {
    setLoading(true);
    setAuthMessage(null);

    if (!firstName || !lastName || !email || !password) {
      throw new Error("Missing credentials");
    }
    if (password !== confirm) {
      throw new Error("Passwords do not match");
    }

    try {
        const response = await registerApi({
          firstname: firstName,
          lastName,
          email,
          password,
          token: "8YUzw_tjotM_oqt9_8XxI",
          domain: "auth.crystalhansenartographic"
        });

        setAuthMessage({
          type: response.status,
          text: response.message,
        });


        emitAuthEvent("signup_success", {
          email,
        });
        return response;
    } catch (err) {
        console.error("Signup failed:", err);

        setAuthMessage({
          type: "error",
          text: err.message || "Signup failed. Please try again.",
        });

        emitAuthEvent("signup_failure", {
          email,
          error: err.message,
        });

        throw err;        
    } finally {
      setLoading(false);
    }
  };

  /* ======================
      LOGIN (REAL PERSISTENCE)
  ====================== */
  const login = async ({ email, password }) => {
    setLoading(true);
    setAuthMessage(null);

    try {
        const response = await loginApi({
          username: email,
          password,
          token: "8YUzw_tjotM_oqt9_8XxI",
        });
      
        await resolveSession();

        setAuthMessage({
          type: "success",
          text: response.message,
        });

        /*emitAuthEvent("login_success", {
          authMode: AUTH_MODE,
        });*/

        return true;

    } catch (err) {

        console.error("Login failed:", err);

        setAuthMessage({
          type: "error",
          text: err.message || "Login failed. Please try again.",
        });

        /*emitAuthEvent("login_failure", {
          email,
          error: err.message,
        });*/

        throw err;
    } finally {
      setLoading(false);
    }
  };

    /* ======================
      LOGOOUT (REAL PERSISTENCE)
  ====================== */

  const logout = async () => {
    setLoading(true);
    setAuthMessage(null);
    try{
    /*await fetch("/api/auth/logout", {
        method: "POST",
        //credentials: "include",
      });*/
      localStorage.removeItem("auth_user");
      setAuthUser(null);

      setAuthMessage({
        type: "success",
        text: "You've been logged out.",
      });
      emitAuthEvent("user_logout", {
      });

      return true;
    } catch (err) {
      console.error("Logout failed:", err);

      setAuthMessage({
        type: "error",
        text: err.message || "Logout failed. Please try again.",
      });

      emitAuthEvent("logout_failure", {
        error: err.message,
      });
        setAuthUser(null);
      //throw err;
    } finally {
      setLoading(false);
    }
  };

/* ======================
      PASSWORD RESET
  ====================== */
  const requestPasswordReset = async ({email}) => {
    setLoading(true);
    try {

      const payload = {
        email,
        token: "8YUzw_tjotM_oqt9_8XxI",
      }
      console.log(payload);
      const response = await requestPasswordResetApi(payload );


      setAuthMessage({
        type: response.status,
        text: response.message,
      });
      emitAuthEvent("password_reset_requested", {
        email,
        type: response.status,
        message: response.message,
      });

      return response;
    } catch (err) {
      //console.error("request password failed:", err);

      setAuthMessage({
        type: "error",
        text: err.message || "Request password reset request failed. Please try again.",
      });

      emitAuthEvent("password_reset_requested", {
        email,
        error: err.message,
      });
      //throw err;      
    } finally {
      setLoading(false);
    }
  };


/* ======================
      CONFIRM RESET PASSWORD CHANGE POST
  ====================== */
  const resetPassword = async ({ email, password, confirm, tokenUrl, token }) => {
    setLoading(true);

    if (password !== confirm) {
      throw new Error("Passwords do not match");
    }

    try {
      const response = await confirmPasswordResetApi({
        email,
        password,
        token,
        tokenUrl,
      });

      setAuthMessage({
        type: "success",
        text: response.message,
      });

      emitAuthEvent("password_reset_submit", {
        email,
        message: response.message,
      });
      return response;

    } catch (err) {
        console.error(" Password reset failed:", err);

        setAuthMessage({
          type: "error",
          text: err.message || "Password reset failed. Please try again.",
        });

        emitAuthEvent("password_reset_submit", {
          email,
          error: err.message,
        });
        throw err; 
    } finally {
      setLoading(false);
    }
  };


/* ======================
      VERIFY EMAIL ACCOUNT
  ====================== */

  const verifyEmailAccount = useCallback(async ({ email, tokenUrl, token }) => {
    setLoading(true);
    try {
      const response = await verifyEmailApi({
        email,
        token,
        jwttoken: tokenUrl,
      });

      setAuthMessage({
        type: response.success ? "success" : "error",
        text: response.message,
      });
      emitAuthEvent("verify_email", {
        email,
        message: response.message,
        });
      return response;

    } catch (err) {
        console.error(" Verify Email  failed:", err);

        setAuthMessage({
          type: "error",
          text: err.message || "Verify Email failed. Please try again.",
        });

        emitAuthEvent("verify_email", {
          email,
          error: err.message,
        });
        throw err;       
    } finally {
      setLoading(false);
    }
  }, []);

  /* =====================================================
     BLOCK UI UNTIL AUTH READY
  ===================================================== */
  if (!authReady) {
    return <div className="app-splash">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        authuser,
        authReady,
        loading,
        login,
        logout,
        signup,
        requestPasswordReset,
        resetPassword,
        verifyEmailAccount,
        authMessage,
        clearAuthMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
