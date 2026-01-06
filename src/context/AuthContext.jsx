import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
/**
 * Final UX Flow

User signs up

Passwords validated inline

Message: “Check your email”

Can resend confirmation

Click email link → /confirm-email?token=...

Success → login page

TODO:
Auto-login after confirmation

Token expiry handling

Confirmation error states (expired / already used)

Auth flow tests (Vitest)

Persist pending signup email across reloads


/**. Backend Java 
 * /auth/login

  /auth/register

  /auth/reset-request

  /auth/reset-confirm

 */

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export function AuthProvider({ children }) {

  //const [user, setUser] = useState(null);
  const [user, setUser] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("user"));
      } catch {
        return null;
      }
  });


  const [loading, setLoading] = useState(true);
  const [authMessage, setAuthMessage] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    setAuthReady(true);
  }, []);

  // 🔹 Restore auth on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (!storedUser) {
      setLoading(false);
      return;
    }
    
    const parsed = JSON.parse(storedUser);

    if (parsed.expiresAt < Date.now()) {
      localStorage.removeItem("auth_user");
      setUser(null);
      setAuthMessage({
        type: "info",
        text: "Your session has expired. Please log in again.",
      });
    } else {
      setUser(parsed);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);


  const isAuthenticated = !!user&& !!user.token && (!user.expiresAt || user.expiresAt > Date.now());

 /* ======================
      SIGNUP (NEW)
  ====================== */
  const signup = async ({ firstName, lastName, email, password, confirm }) => {

    setAuthMessage(null);

    // 🔒 Basic validation
    if (!firstName || !lastName || !email || !password) {
      throw new Error("Missing credentials");
    }

    if (password !== confirm) {
      throw new Error("Passwords do not match");
    }

    // ⏳ Mock API delay  /auth/register
    await new Promise((res) => setTimeout(res, 800));

    /**
     * Mock API response:
     * POST  /auth/register
     * → 201 Created
     * → confirmation email sent
     */
    localStorage.setItem("pending_signup_email", email); // add firstname lastname to thie as a user object later kanban addition

    setAuthMessage({
      type: "success",
      text: "Check your email to confirm your account.",
    });

    return true;
  };

 /* ======================
      LOGIN   //  Login success handler
  ====================== */

  const login = async ({ email, password }) => {
    /**
     * Replace this with a real API call:
     * const res = await api.post("/login", { email, password })
     */
/**.  /auth/login
    * await fetch("http://localhost:8080/api/login", {
   method: "POST",
   */
   // ⏳ Mock API delay
    await new Promise((res) => setTimeout(res, 800));
    
    // Mock response
    const fakeUser = {
      id: "123",
      email,
      name: "Demo User",
      token: "mock-jwt-token",
      expiresAt: Date.now() + 1000 *60*60, //1 hour
    };
    
    //console.log(fakeUser);

    localStorage.setItem("auth_user", JSON.stringify(fakeUser));
    setUser(fakeUser);

    return fakeUser;
  };
 /* ======================
      LOGOUT   //  Logout success handler
  ====================== */
  const logout = () => {
   
    localStorage.removeItem("auth_user");
    setUser(null);
    // mock delay
   

    setAuthMessage({
      type: "success",
      text: "Youve been logged out.",
    });

    return true;
  };

  /*** Handle Auth Messages  clear the mesage*/
  const clearAuthMessage = () => {
    setAuthMessage(null);
  };

  /* ======================
      EMAIL CONFIRMATION LINK   
  ====================== */
  ///auth/reset-request

 
const resendConfirmation = async (email) => {
    if (!email) {
      throw new Error("Missing email address");
    }

    // mock delay
    await new Promise((res) => setTimeout(res, 700));

    setAuthMessage({
      type: "success",
      text: "Confirmation email resent. Please check your inbox.",
    });

    return true;
  };
/* ======================
    UPDATE PROFILE -- first/last name
====================== */
const updateProfile = async ({ firstName, lastName }) => {
  if (!firstName || !lastName) {
    throw new Error("Name fields cannot be empty");
  }

  const updatedUser = {
    ...user,
    firstName,
    lastName,
  };

  localStorage.setItem("auth_user", JSON.stringify(updatedUser));
  setUser(updatedUser);

   // mock delay
    await new Promise((res) => setTimeout(res, 700));

    setAuthMessage({
      type: "success",
      text: "Your profile has been updated.",
    });


  return true;
};

/* ======================
    PASSWORD RESET  // Email Link
====================== */
const requestPasswordReset = async (email) => {
  //hit reset endpoint 
  if (!email) {
    throw new Error("Missing email address");
  }
/// /auth/reset-confirm
  await new Promise((res) => setTimeout(res, 600));

  setAuthMessage({
    type: "success",
    text: "Password reset link sent to your email.",
  });
};

/* ======================
    EMAIL CHANGE -- /profile page
====================== */
const requestEmailChange = async (newEmail) => {
  if (!newEmail) {
    throw new Error("Email is required");
  }

  await new Promise((res) => setTimeout(res, 600));

  setAuthMessage({
    type: "success",
    text: "Email change confirmation sent. Check your inbox.",
  });
};

/* ======================
      Reset Password   //  Reset Password success handler Request Rest Form 
  ====================== */
const resetPassword = async ({ email, password, confirm, token }) => {
    
   // console.log(email + " " + password + " " +  confirm  + " " + token);

    setAuthMessage(null);

    // 🔒 Basic validation
    if (!email || !password) {
      throw new Error("Missing credentials");
    }

    if (password !== confirm) {
      throw new Error("Passwords do not match");
    }

    // ⏳ Mock API delay.  /auth/reset-confirm
    await new Promise((res) => setTimeout(res, 800));

    /**
     * Mock API response:
     * POST /resetPassword
     * → 201 Created
     * → confirmation email sent
     */

    setAuthMessage({
      type: "success",
      text: "Your password has been reset. Please login.",
    });

    return true;
  };

  const value = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,


    updateProfile,
    requestPasswordReset,
    requestEmailChange,
  
    resendConfirmation,
    resetPassword,
    authMessage,
    authReady,
    clearAuthMessage,
  };


  // Prevent route flicker before auth restores
  if (loading) {
    return <div className="app-splash">Loading...</div>; // or spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
