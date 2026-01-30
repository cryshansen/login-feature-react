import { http, HttpResponse } from "msw";
import { AUTH_API } from "@/config/api";
let isAuthenticated = false;

const API = AUTH_API;

export const loginHandlers = [

  http.post(`${API}/login`, async () => {
    isAuthenticated = true;
    return HttpResponse.json({
      success: true,
      message: "Login successful",
    });
  }),

];
