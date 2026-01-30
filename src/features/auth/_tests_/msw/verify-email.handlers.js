import { http, HttpResponse } from "msw";
import { AUTH_API } from "@/config/env";
let isAuthenticated = false;
const API = AUTH_API;
export const emailHandlers = [
  
  http.post(`${API}/verify-email`, async ({ request }) => {
    const { token } = await request.json();

    if (token === 'invalid-token') {
      return HttpResponse.json(
        { message: 'Invalid or expired verification token.' },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      { message: 'Email verified successfully.' },
      { status: 200 }
    );
  }),
];
