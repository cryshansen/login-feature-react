import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  login as loginApi,
  register as registerApi,
  requestPasswordResetApi,
  confirmPasswordResetApi,
  verifyEmailApi,
} from "../features/api/services/auth.service";
import { AUTH_MODE } from "../config/auth.config";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authuser, setAuthUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState(null);

  /* =====================================================
     BOOTSTRAP AUTH (COOKIE OR TOKEN)
  ===================================================== */
  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        if (AUTH_MODE === "cookie") {
          const res = await fetch("/api/auth/me", {
            credentials: "include",
          });

          if (res.ok) {
            const data = await res.json();
            setAuthUser(data.user);
          } else {
            setAuthUser(null);
          }
        }

        if (AUTH_MODE === "token") {
          const stored = localStorage.getItem("auth_user");
          if (!stored) return;

          const parsed = JSON.parse(stored);
          if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
            localStorage.removeItem("auth_user");
          } else {
            setAuthUser(parsed);
          }
        }
      } catch {
        setAuthUser(null);
      } finally {
        setAuthReady(true);
      }
    };

    bootstrapAuth();
  }, []);

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

  const isAuthenticated = !!authuser;

  const clearAuthMessage = () => setAuthMessage(null);

  /* =====================================================
     AUTH ACTIONS
  ===================================================== */

  const login = async ({ email, password }) => {
    setLoading(true);
    setAuthMessage(null);

    try {
      const response = await loginApi({
        username: email,
        password,
        token: "8YUzw_tjotM_oqt9_8XxI",
      });

      if (AUTH_MODE === "token") {
        const user = {
          ...response.user,
          token: response.token,
          expiresAt: response.expiresAt,
        };
        setAuthUser(user);
      }

      if (AUTH_MODE === "cookie") {
        setAuthUser(response.user); // cookie already set by server
      }

      setAuthMessage({
        type: "success",
        text: response.message,
      });

      return response.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setAuthUser(null);
      setLoading(false);
    }
  };

  const signup = async (payload) => {
    setLoading(true);
    try {
      const response = await registerApi(payload);
      setAuthMessage({
        type: response.status,
        text: response.message,
      });
      return response;
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (email) => {
    setLoading(true);
    try {
      const response = await requestPasswordResetApi({ email });
      setAuthMessage({
        type: response.status,
        text: response.message,
      });
      return response;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data) => {
    setLoading(true);
    try {
      const response = await confirmPasswordResetApi(data);
      setAuthMessage({
        type: "success",
        text: response.message,
      });
      return response;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmailAccount = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await verifyEmailApi(data);
      setAuthMessage({
        type: response.success ? "success" : "error",
        text: response.message,
      });
      return response;
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
        isAuthenticated,
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
