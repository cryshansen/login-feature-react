import React from 'react';
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { renderWithAuth } from "./test-utils";
import PublicOnlyRoute from "../routes/PublicOnlyRoute";
import ProtectedRoute from "../routes/ProtectedRoute";
import * as authApi from "../api/services/auth.service";

describe("Redirect / guard routes", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("redirects logged-in user away from login page", async () => {
    vi.spyOn(authApi, "meApi").mockResolvedValue({
      success: true,
      user: { email: "test2@test.com" },
    });

    renderWithAuth(
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<div>Login Page</div>} />
        </Route>
        <Route path="/profile" element={<div>Profile Page</div>} />
      </Routes>,
      { route: "/login" }
    );

    await waitForElementToBeRemoved(() =>
      screen.getByText(/checking access/i)
    );

    expect(await screen.findByText(/profile page/i)).toBeInTheDocument();
  });

  test("allows authenticated user to access protected route", async () => {
    vi.spyOn(authApi, "meApi").mockResolvedValue({
      success: true,
      user: { email: "test2@test.com" },
    });

    renderWithAuth(
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<div>Protected Content</div>} />
        </Route>
      </Routes>,
      { route: "/profile" }
    );

    await waitForElementToBeRemoved(() =>
      screen.getByText(/checking access/i)
    );

    expect(
      await screen.findByText(/protected content/i)
    ).toBeInTheDocument();
  });
});
