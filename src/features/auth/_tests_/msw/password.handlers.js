import { http, HttpResponse } from "msw";

let isAuthenticated = false;
const API = 'http://localhost';

export const passwordHandlers = [
     
  http.post(`${API}/resetpassword`, async ({ request }) => {
    const { email } = await request.json();

    if (email === 'nonexistent@test.com') {
      return HttpResponse.json(
        { message: 'No account found with this email address.' },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      { message: 'Password reset email sent.' },
      { status: 200 }
    );
  }),
];
