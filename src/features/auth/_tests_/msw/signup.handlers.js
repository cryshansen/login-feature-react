import { http, HttpResponse } from "msw";

import { API_CONFIG } from "../../../config/env";

let isAuthenticated = false;

const API = API_CONFIG.AUTH_BASE_URL;

export const signupHandlers = [
  http.post(`${API}/signup`, async ({ request }) => {
    const { email } = await request.json();

    if (email === 'test11@test.com') {
      return HttpResponse.json(
        { message: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    return HttpResponse.json(
      { message: 'Signup successful. Verification email sent.' },
      { status: 201 }
    );
  }),
];
