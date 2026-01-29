
import { rest } from 'msw';

const API = 'http://localhost/auth';

export const authHandlers =  [
  // ❌ Email already exists
  rest.post(`${API}/signup`, async (req, res, ctx) => {
    const { email } = await req.json();

    if (email === 'test11@test.com') {
      return res(
        ctx.status(409),
        ctx.json({
          message: 'An account with this email already exists.',
        })
      );
    }

    // ✅ Successful signup
    return res(
      ctx.status(201),
      ctx.json({
        message: 'Signup successful. Verification email sent.',
      })
    );
  }),
];