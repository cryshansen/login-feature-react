import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  login as loginApi,
  register as registerApi,
  requestPasswordResetApi,
  confirmPasswordResetApi,
  verifyEmailApi,
} from "../features/api/services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authuser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  /* ======================
      Restore auth on app load
  ====================== */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth_user");
      if (!stored) {
        setAuthReady(true);
        return;
      }

      const parsed = JSON.parse(stored);

      if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
        localStorage.removeItem("auth_user");
        setAuthUser(null);
      } else {
        setAuthUser(parsed);
      }
    } catch {
      localStorage.removeItem("auth_user");
      setAuthUser(null);
    } finally {
      setAuthReady(true);
    }
  }, []);

  /* ======================
      Persist auth changes
  ====================== */
  useEffect(() => {
    if (authuser) {
      localStorage.setItem("auth_user", JSON.stringify(authuser));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [authuser]);

  const isAuthenticated =
    !!authuser &&
    !!authuser.token &&
    (!authuser.expiresAt || authuser.expiresAt > Date.now());

  const clearAuthMessage = () => setAuthMessage(null);

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
      });

      localStorage.setItem("pending_signup_email", email);

      setAuthMessage({
        type: response.status,
        text: response.message,
      });

      return response;
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

      // 🔑 EXPECT THIS FROM BACKEND
      const user = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        token: response.token,
        expiresAt: response.expiresAt, // optional
      };

      setAuthUser(user);

      setAuthMessage({
        type: "success",
        text: response.message,
      });

      return user;
    } catch (error) {
      setAuthMessage({
        type: "failed",
        text: error.message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* ======================
      LOGOUT
  ====================== */
  const logout = async () => {
    localStorage.removeItem("auth_user");
    setAuthUser(null);

    setAuthMessage({
      type: "success",
      text: "You've been logged out.",
    });

    return true;
  };

  /* ======================
      PASSWORD RESET
  ====================== */
  const requestPasswordReset = async (email) => {
    setLoading(true);
    try {
      const response = await requestPasswordResetApi({
        email,
        token: "8YUzw_tjotM_oqt9_8XxI",
      });

      setAuthMessage({
        type: response.status,
        text: response.message,
      });

      return response;
    } finally {
      setLoading(false);
    }
  };

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

      return response;
    } finally {
      setLoading(false);
    }
  };

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

      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  /* ======================
      Guard bootstrapping
  ====================== */
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
        signup,
        logout,
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
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
