import { http, HttpResponse } from "msw";
import { API_CONFIG } from "../../../../config/env";

let isAuthenticated = false;

const API = API_CONFIG.AUTH_BASE_URL;

export const logoutHandlers = [

  http.post(`${API}/logout`, async () => {
    isAuthenticated = false;
    return HttpResponse.json({ success: true });
  }),

];
