// src/features/auth/config/auth.config.ts
import { API_CONFIG } from "../../../config/env";

export const AUTH_CONFIG = {
  authBaseUrl: API_CONFIG.AUTH_BASE_URL,
  userBaseUrl: API_CONFIG.USER_API_URL,
  authTelBaseUrl: API_CONFIG.AUTHTEL_API_URL,
};



//export const AUTH_MODE = "cookie"; 
// "cookie" | "token"
