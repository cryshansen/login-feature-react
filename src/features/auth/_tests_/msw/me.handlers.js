import { http, HttpResponse } from "msw";
import { AUTH_API } from "@/config/env";
let isAuthenticated = false;
const API = AUTH_API;

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
