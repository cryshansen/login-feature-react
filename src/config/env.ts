// src/config/env.ts
const DEFAULT_API = "http://localhost";
export const API_CONFIG = {
  AUTH_BASE_URL: import.meta.env.VITE_AUTH_API_URL ?? DEFAULT_API,
  USER_API_URL : import.meta.env.VITE_USER_API_URL?? DEFAULT_API,
  AUTHTEL_API_URL : import.meta.env.VITE_AUTHTEL_API_URL?? DEFAULT_API
};

