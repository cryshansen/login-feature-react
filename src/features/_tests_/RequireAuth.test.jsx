import { screen } from "@testing-library/react";
import { Routes, Route, MemoryRouter } from "react-router-dom";
//import RequireAuth from "../routes/RequireAuth";
import ProtectedRoute from "../routes/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import { render } from "@testing-library/react";
import { describe, test, expect, it, render } from "vitest";



function Protected() {
  return <div>Protected Content</div>;
}


test("redirects unauthenticated user to login", async () => {
  render(
    <MemoryRouter initialEntries={["/protected"]}>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<Protected />} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );

  expect(await screen.findByText(/login page/i)).toBeInTheDocument();
});

