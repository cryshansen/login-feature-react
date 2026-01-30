import { http, HttpResponse } from "msw";

let isAuthenticated = false;

const API = 'http://localhost';

export const logoutHandlers = [

  http.post(`${API}/api/auth/logout`, async () => {
    isAuthenticated = false;
    return HttpResponse.json({ success: true });
  }),

];
