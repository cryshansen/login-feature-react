import { http, HttpResponse } from "msw";

let isAuthenticated = false;

const API = 'http://localhost';

export const loginHandlers = [
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

  http.post(`${API}/api/auth/login`, async () => {
    isAuthenticated = true;
    return HttpResponse.json({
      success: true,
      message: "Login successful",
    });
  }),

  http.post(`${API}/api/auth/logout`, async () => {
    isAuthenticated = false;
    return HttpResponse.json({ success: true });
  }),

];
