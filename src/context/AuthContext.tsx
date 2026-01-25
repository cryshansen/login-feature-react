import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import {
  loginApi,
  registerApi,
  requestPasswordResetApi,
  confirmPasswordResetApi,
  verifyEmailApi,
  meApi,
} from "../features/api/services/auth.service";
import type {AuthUser, AuthContextValue, SignupArgs, LoginArgs, MessageResponse,RequestPasswordResetArgs,VerifyEmailArgs,PasswordResetArgs, AuthMessageMap} from "../features/api/schemas/auth.types";
import { emitAuthEvent } from "../features/api/services/authTelemetry.service";
import { useLoading } from "../context/LoadingContext";

type AuthProviderProps = {
  children: ReactNode;
};
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children } : AuthProviderProps) {


  const { showLoader, hideLoader } = useLoading();
   
  
  const [authuser, setAuthUser] = useState<AuthUser | null>(null);
  const [authMessage, setAuthMessage] = useState<AuthMessageMap | null>(null);

  const [authReady, setAuthReady] = useState(false);
  const [loading, setLoading] = useState(false);


  const IDLE_TIMEOUT = 1000 * 60 * 30; // 30 minutes

  const clearAuthMessage = () => setAuthMessage(null);



  /* =====================================================
     RESOLVE SESSION (THE SOURCE OF TRUTH)
  ===================================================== */
  const resolveSession = useCallback(async () => {
    try {
      const user = await meApi();
      setAuthUser(user);
      return user;
    } catch {
      setAuthUser(null);
      return null;
    }
  }, []);

  /* =====================================================
     BOOTSTRAP AUTH
  ===================================================== */
  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        const user = await resolveSession();

        if (!cancelled && user?.emailVerified === false) {
          setAuthMessage({
            type: "warning",
            text: "Please verify your email to continue.",
          });
        }
      } finally {
        if (!cancelled) setAuthReady(true);
      }
    };

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [resolveSession]);

  /* =====================================================
     GLOBAL ACTIVITY TRACKING
  ===================================================== */
  useEffect(() => {
    const updateActivity = () => {
      localStorage.setItem("last_activity", Date.now().toString());
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
     IDLE LOGOUT
  ===================================================== */
  useEffect(() => {
    const interval = setInterval(() => {
      const last = Number(localStorage.getItem("last_activity"));
      if (!last) return;

      if (Date.now() - last > IDLE_TIMEOUT) {
        setAuthUser(null);
        emitAuthEvent("idle_logout");
        setAuthMessage({
          type: "info",
          text: "You were logged out due to inactivity.",
        });
      }
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  /* ======================
      SIGNUP
  ====================== */
  const signup = async ({ email, firstName, lastName,  password, confirm }:SignupArgs): Promise<MessageResponse> => {
   // setLoading(true);
        showLoader();
    setAuthMessage(null);

    if (!firstName || !lastName || !email || !password) {
      throw new Error("Missing credentials");
    }
    if (password !== confirm) {
      throw new Error("Passwords do not match");
    }

    try {
      //payload directly defined vs a $data array the auth.types.ts payload is not referenced here it is just built to the spec
      const response = await registerApi({
        firstname: firstName,
        lastName,
        email,
        password,
        token: "8YUzw_tjotM_oqt9_8XxI",
        domain: "auth.crystalhansenartographic",
      });

      setAuthMessage({
        type: "success",  // success is boolean but type is string "success","warning", "error"
        text: response.message,
      });

      emitAuthEvent("signup_success", { email });
      return response;
    } catch (err:any) {
      setAuthMessage({
        type: "error",
        text: err.message || "Signup failed.",
      });
      emitAuthEvent("signup_failure", { email, error: err.message });
      throw err;
    } finally {
      //setLoading(false);
      hideLoader();
    }
  };

  /* ======================
      LOGIN
  ====================== */
  const login = async ({ email, password }:LoginArgs): Promise<MessageResponse> => {
    showLoader();
    setAuthMessage(null);

    try {
      const response = await loginApi({
        username: email,
        password,
        token: "8YUzw_tjotM_oqt9_8XxI",
      });

      await resolveSession();

      setAuthMessage({
        type: response.success ? "success" : "error",
        text: response.message,
      });

      emitAuthEvent("login_success");
      return response;
    } catch (err:any) {
      setAuthMessage({
        type: "error",
        text: err.message || "Login failed.",
      });

      emitAuthEvent("login_failure", { email, error: err.message });
      throw err;
    } finally {
      //setLoading(false);
      hideLoader();
    }
  };

  /* ======================
      LOGOUT
  ====================== */
  const logout = async () :Promise<MessageResponse>=> {
    showLoader()
    setAuthMessage(null);

    try {
      setAuthUser(null);
      setAuthMessage({
        type: "success",
        text: "You've been logged out.",
      });
      emitAuthEvent("user_logout");
      return { message: "You've been logged out." ,  success: true };
    } finally {
      hideLoader();
    }
  };

  /* ======================
      PASSWORD RESET
  ====================== */
  const requestPasswordReset = async ({ email }:RequestPasswordResetArgs):Promise <MessageResponse> => {
         showLoader();
    try {
      /**RequestPasswordResetRequest payload*/
      const response = await requestPasswordResetApi({
        email,
        token: "8YUzw_tjotM_oqt9_8XxI", //captcha token replace with
      });

      setAuthMessage({
        type: response.success ? "success" : "error",
        text: response.message,
      });

      emitAuthEvent("password_reset_requested", { email });
      return response;
     } catch (err:any) {

      setAuthMessage({
        type: "error",
        text: err.message || "Password Request Failed",
      });

      emitAuthEvent("password_reset_requested_failure", { email, error: err.message });
      throw err;
    } finally {
      hideLoader();
    }
  };

  /* ======================
      RESET PASSWORD
  ====================== */
  const resetPassword = async ({ email, password, confirm, tokenUrl, token }:PasswordResetArgs) :Promise<MessageResponse> => {
         showLoader();

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
        type: response.success ? "success" : "error",
        text: response.message,
      });

      emitAuthEvent("password_reset_submit", { email });
      return response;
    } finally {
      hideLoader();
    }
  };

  /* ======================
      VERIFY EMAIL
  ====================== */
  const verifyEmailAccount = useCallback(async ({ email, tokenUrl, token }:VerifyEmailArgs):Promise<MessageResponse> => {
         showLoader();
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

      emitAuthEvent("verify_email", { email });
      return response;
    } finally {
      hideLoader();
    }
  }, []);

  /* =====================================================
     BLOCK UI UNTIL READY
  ===================================================== */
  // if (!authReady) {
  //   return showLoader();
  // }

  return (
    <AuthContext.Provider
      value={{
        authuser,
        authReady,
        authMessage,
        loading,
        login,
        logout,
        signup,
        requestPasswordReset,
        resetPassword,
        verifyEmailAccount,
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
