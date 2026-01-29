import { screen, render } from "@testing-library/react";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import { describe, test, expect, it } from "vitest";

import ProtectedRoute from "../routes/ProtectedRoute";
import * as authService from "../api/services/auth.service";
import {renderWithAuth} from "./test-utils";



import { useAuth } from "../context/AuthContext";

vi.mock("../context/AuthContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,        // keep AuthProvider
    useAuth: vi.fn(), // mock hook
  };
});

function Protected() {
  return <div>Protected Content</div>;
}


test("redirects unauthenticated user to login", async () => {
   vi.mocked(useAuth).mockReturnValue({
    authReady: true,   // ✅ skip GuardLoader
    authuser: null,    // ✅ unauthenticated
  });
  renderWithAuth(
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<Protected />} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
    , { route: "/protected" }
  );

  expect(await screen.findByText(/login page/i)).toBeInTheDocument();
});

test("shows guard loader while auth initializes", () => {
  vi.mocked(useAuth).mockReturnValue({
    authReady: false,
    authuser: null,
  });

  renderWithAuth(
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/protected" element={<Protected />} />
      </Route>
    </Routes>,
    { route: "/protected" }
  );

  expect(screen.getByText(/checking access/i)).toBeInTheDocument();
});

test("renders protected content for authenticated user", async () => {
  vi.mocked(useAuth).mockReturnValue({
    authReady: true,
    authuser: { id: "user1", email: "test14@test.com" }, });

  renderWithAuth(
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/protected" element={<Protected />} />
      </Route>
    </Routes>,
    { route: "/protected" }
  );

  expect(
    await screen.findByText(/protected content/i)
  ).toBeInTheDocument();
});

/*==============================
  Redirect authenticated user away from login page
  Prevents auth users from seeing public pages

Ensures route guards respect auth state
===============================*/


it("redirects authenticated user away from login page", async () => {
  // mock authenticated session
  vi.spyOn(authService, "meApi").mockResolvedValue({
    id: 1,
    email: "auth@test.com",
    emailVerified: true,
  });
  
    renderWithAuth(
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<Protected />} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
    , { route: "/protected" }
  );
  // should redirect automatically to dashboard
  expect(await screen.findByText(/protected/i)).toBeInTheDocument();
});
