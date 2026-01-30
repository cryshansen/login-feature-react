import { http, HttpResponse } from "msw";
import { AUTH_API } from "@/config/api";

let isAuthenticated = false;

const API = AUTH_API;

export const logoutHandlers = [

  http.post(`${API}/logout`, async () => {
    isAuthenticated = false;
    return HttpResponse.json({ success: true });
  }),

];
