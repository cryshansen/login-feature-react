import { http, HttpResponse } from "msw";

let isAuthenticated = false;
const API = 'http://localhost';

export const meHandlers = [
  http.get(`${API}/api/auth/me`, () => {
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
