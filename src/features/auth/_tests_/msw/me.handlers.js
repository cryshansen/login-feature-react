import { http, HttpResponse } from "msw";
import { API_CONFIG } from "../../../../config/env";
let isAuthenticated = false;
const API = API_CONFIG.AUTH_BASE_URL;

export const meHandlers = [
  http.get(`${API}/me`, () => {
    if (!isAuthenticated) {
      return HttpResponse.json(
        { error: "Unauthenticated" },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      id: 1,
      email: "me@test.com",
      emailVerified: true,
    });
  }),

];
