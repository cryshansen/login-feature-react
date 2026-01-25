import RedirectIfAuth from "../routes/RedirectIfAuth";
import PublicOnlyRoute from "../routes/PublicOnlyRoute";
import { renderHook, act, render } from "@testing-library/react";


test("redirects logged-in user away from login page", async () => {
  localStorage.setItem(
    "auth_user",
    JSON.stringify({ email: "test@test.com" })
  );

  render(
    <MemoryRouter initialEntries={["/login"]}>
      <AuthProvider>
        <Routes>
          <Route element={<RedirectIfAuth />}>
            <Route path="/login" element={<div>Login Page</div>} />
          </Route>
          <Route path="/" element={<div>Profile Page</div>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );

  expect(await screen.findByText(/profile/i)).toBeInTheDocument();
});

test("allows authenticated user to access protected route", async () => {
  /*localStorage.setItem(
    "auth_user",
    JSON.stringify({ email: "test@test.com" })
  );*/

  render(
    <MemoryRouter initialEntries={["/protected"]}>
      <AuthProvider>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/protected" element={<Protected />} />
          </Route>
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );

  expect(
    await screen.findByText(/protected content/i)
  ).toBeInTheDocument();
});
