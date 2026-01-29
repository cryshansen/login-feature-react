import { http, HttpResponse } from "msw";

let isAuthenticated = false;
const API = 'http://localhost';
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
