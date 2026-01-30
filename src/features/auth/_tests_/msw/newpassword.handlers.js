import { http, HttpResponse } from "msw";

let isAuthenticated = false;
const API = 'http://localhost';

export const newpasswordHandlers = [
  
  http.post(`${API}/resetnewpass`, async ({ request }) => {
    const { token } = await request.json();

    if (token === 'invalid-token') {
      return HttpResponse.json(
        { message: 'Invalid or expired password reset token.' },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      { message: 'Password has been reset successfully.' },
      { status: 200 }
    );
  }),
];
