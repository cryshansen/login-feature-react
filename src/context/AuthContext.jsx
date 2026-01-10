import { createContext, useContext, useEffect, useState,useCallback } from "react";
// context/AuthContext.tsx
import {
  login as loginApi,
  register as registerApi,
  requestPasswordResetApi, //send email to update pasword
  confirmPasswordResetApi, //send password 
  verifyEmailApi //after signup receive email, click link, page handles data and sends email validation to server. 
} from "../features/api/services/auth.service";

const AuthContext = createContext(null);

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export function AuthProvider({ children }) {

  //const [user, setUser] = useState(null);
  const [authuser, setAuthUser] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("auth_user"));
      } catch {
        return null;
      }
  });


  const [loading, setLoading] = useState(false);
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
      setAuthUser(null);
      setAuthMessage({
        type: "info",
        text: "Your session has expired. Please log in again.",
      });
    } else {
      setAuthUser(parsed);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (authuser) {
      localStorage.setItem("auth_user", JSON.stringify(authuser));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [authuser]);


  const isAuthenticated = !!authuser&& !!authuser.token && (!authuser.expiresAt || authuser.expiresAt > Date.now());
 /*** Handle Auth Messages  clear the mesage*/
  const clearAuthMessage = () => {
    setAuthMessage(null);
  };


 /* ======================
      SIGNUP (NEW)
      * Mock API response:
      * POST  /auth/register
      * → 201 Created
      * → confirmation email sent
  ====================== */
  const signup = async ({ firstName, lastName, email, password, confirm }) => {
    setLoading(true);
    setAuthMessage(null);

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      throw new Error("Missing credentials");
    }

    if (password !== confirm) {
      throw new Error("Passwords do not match");
    }

    try{
      const data = {
        firstname: firstName,
        lastName: lastName,
        email: email,
        password: password,
        token: "8YUzw_tjotM_oqt9_8XxI" //fake captcha value to include todo

      }
        const response = await registerApi( data );  
       
        localStorage.setItem("pending_signup_email", email); // add firstname lastname to this as a user object later kanban addition
        setAuthMessage({
          type: response.status,
          text: response.message,
        });
    } catch (error){
        console.log(error);  
        setAuthMessage({
            type: "failed",
            text: error.message,
          });
    } finally { 
      setLoading(false);
    }
   
    return true;
  };

 /* ======================
      LOGIN   //  Login success handler
  ====================== */

  const login = async ({ email, password }) => {
 
    setLoading(true);

    try {

       const data = {
        username: email,
        password: password,
        token: "8YUzw_tjotM_oqt9_8XxI" //fake captcha value to include
      }
    

      const response = await loginApi( data );
      setAuthMessage({
        type: response.status,
        text: response.message,
      });
        // Mock user todo : user from response after captcha
      const fakeUser = {
          id: "123",
          email,
          name: "Demo User",
          token: "mock-jwt-token",
          expiresAt: Date.now() + 1000 *60*60, //1 hour
        };
        
        localStorage.setItem("auth_user", JSON.stringify(fakeUser));
        setAuthUser(fakeUser);

    } catch (error){
        console.log(error);
        setAuthMessage({
          type: "failed",
          text: error.message,
        });

    } finally {
        setLoading(false);

    }
    return fakeUser;
  };
 /* ======================
      LOGOUT   //  Logout success handler
  ====================== */
  const logout = async() => {
   
    localStorage.removeItem("auth_user");
    
    setAuthUser(null);
    // mock delay
    await new Promise((res) => setTimeout(res, 700));

    setAuthMessage({
      type: "success",
      text: "Youve been logged out.",
    });

    return true;
  };

 
/* ======================
    PASSWORD RESET  // Email Link. //RequestPasswordReset
====================== */
const requestPasswordReset = async (email) => {
  setLoading(true);
  //hit reset endpoint 
  if (!email) {
    throw new Error("Missing email address");
  }

  try {
 
      // /resetpassword 
      const data = { 
        email,  
        token: "8YUzw_tjotM_oqt9_8XxI"
      }
      //console.log(data);
      const response = await requestPasswordResetApi(data);
      //console.log(response);

      setAuthMessage({
        type: response.status,
        text: response.message,
      });

  } catch (error) {

      console.log(error);
      setAuthMessage({
        type: "failed",
        text: error.message,
      });

  } finally{
      setLoading(false);
  }

  return true;
};  

/* ======================
      Reset Password   //  Reset Password success handler Request Rest Form
     * Mock API response:
     * POST /resetPassword
     * → 201 Created
     * → confirmation email sent
  ====================== */
const resetPassword = async ({ email, password, confirm,  tokenUrl, token }) => {
    setLoading(true);
    console.log(email + " " + password + " " +  confirm  + " " + token);
    setAuthMessage(null);
    // Basic validation
    if (!email || !password) {
      throw new Error("Missing credentials");
    }
    if (password !== confirm) {
      throw new Error("Passwords do not match");
    }

    try {
        
        const data = { 
              email,
              password,
              token,
              tokenUrl
            }

        const response = await confirmPasswordResetApi(data);
        setAuthMessage({
          type: response.statue,
          text: response.message,
        });
    } catch (err) {
        console.log(err);
        setAuthMessage({
            type: "failure",
            text: err.message,
          });
    } finally {
      
      setLoading(false);

    }
    return true;
  };

  const verifyEmailAccount = useCallback(
    async ({ email, tokenUrl, token}) => {
      setLoading(true);
      try {
            const data = {
                email, 
                token, //captcha
                jwttoken: tokenUrl //e9a18f02b34fb36f01827d8e22dc585a
              };
            const response = await   verifyEmailApi(data);
            setAuthMessage({
              type: response.success ? "success" : "error",
              text: response.message,
            });
          return response;
      }catch(error){
        console.log(error);
        setAuthMessage({
            type: "failure",
            text: error.message,
          });
          throw error;

      } finally{ 
        setLoading(false);
      }
      
    }, []
  );
  const value = {
            authuser,
            isAuthenticated,
            login,
            signup,
            logout,
            requestPasswordReset,
            resetPassword,
            verifyEmailAccount,
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
