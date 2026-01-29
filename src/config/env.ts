// src/config/env.ts
export const API_CONFIG = {
  AUTH_BASE_URL: import.meta.env.VITE_AUTH_API_URL,
  USER_API_URL : import.meta.env.VITE_USER_API_URL,
  AUTHTEL_API_URL : import.meta.env.VITE_AUTHTEL_API_URL,
  AUTH_TEST_MODE: import.meta.env.VITE_AUTH_TEST_MODE,
};
