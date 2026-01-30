import { http, HttpResponse } from "msw";

let isAuthenticated = false;

const API = 'http://localhost';

export const loginHandlers = [

  http.post(`${API}/api/auth/login`, async () => {
    isAuthenticated = true;
    return HttpResponse.json({
      success: true,
      message: "Login successful",
    });
  }),

];
