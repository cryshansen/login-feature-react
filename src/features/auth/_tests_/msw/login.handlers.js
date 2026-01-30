import { http, HttpResponse } from "msw";
import { API_CONFIG } from "../../../../config/env";
let isAuthenticated = false;

const API = API_CONFIG.AUTH_BASE_URL;

export const loginHandlers = [

  http.post(`${API}/login`, async () => {
    isAuthenticated = true;
    return HttpResponse.json({
      success: true,
      message: "Login successful",
    });
  }),

];
