import React from 'react';
import { screen, fireEvent } from "@testing-library/react";

import LoginPage from "../pages/LoginPage";
import { renderWithAuth } from "./test-utils";

import { describe, test, expect, vi } from "vitest";
import { useAuth } from "../context/AuthContext";


/**
 * 🔹 Mock Auth Context
 */
const loginMock = vi.fn();
const clearAuthMessageMock = vi.fn();

vi.mock("../context/AuthContext", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,               // 👈 keeps AuthProvider
    useAuth: vi.fn(),  // 👈 mock useAuth
  };
});

const mockUseAuth = (overrides = {}) => {
  vi.mocked(useAuth).mockReturnValue({
    login: loginMock,
    clearAuthMessage: clearAuthMessageMock,
    authMessage: null,
    authuser:null,
    error: null,
    authReady: true,
    ...overrides,
  });
};



describe("LoginPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockUseAuth();
    });
    test("renders email and password inputs", () => {
        renderWithAuth(<LoginPage />, { route: "/login" });

        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    });


    test("allows typing into email and password fields", async () => {
        renderWithAuth(<LoginPage />, { route: "/login" });

        fireEvent.change(screen.getByLabelText(/^password$/i), {
            target: { value: "Abc234&5" },
        });

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "test10@test.com" },
        });

        expect(screen.getByLabelText(/email/i)).toHaveValue("test10@test.com");
        expect(screen.getByLabelText(/^password$/i)).toHaveValue("Abc234&5");
    });

    test("toggles password visibility", () => {
        renderWithAuth(<LoginPage />, { route: "/login" });

        const passwordInput = screen.getByLabelText(/^password$/i);
        //is EyeIcon(showing button) or EyeSlashIcon(hidden button)
        const toggleButton = screen.getByRole("button", {
            name: /show password/i,
        });

        expect(passwordInput).toHaveAttribute("type", "password");

        fireEvent.click(toggleButton);

        expect(passwordInput).toHaveAttribute("type", "text");
    });

    test("signin button is disabled when values are missing", async () => {
        renderWithAuth(<LoginPage />, { route: "/login" });
        const signinButton = screen.getByRole("button", { name: /sign in/i });

        expect(signinButton).toBeDisabled();

        fireEvent.change(screen.getByLabelText(/^password$/i), {
            target: { value: "Abc234&5" },
        });

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "test10@test.com" },
        });

        expect(signinButton).toBeEnabled();
    });
//You signed in!
    test("shows signed-in message", async () => {
        mockUseAuth({authMessage: { text: "You signed in!" }});

        renderWithAuth(<LoginPage />, { route: "/login" });

        expect(
            await screen.findByText(/signed in/i)
        ).toBeInTheDocument();
    });


    test('finds the input using document.getElementById', () => {
        renderWithAuth(<LoginPage />, { route: "/login" });
        
        // Access the element directly from the document body
        const inputEmailElement = document.getElementById('email'); 
        // Access the element directly from the document body
        const inputPasswordElement = document.getElementById('password'); 
        expect(inputEmailElement).toBeInTheDocument();
        expect(inputPasswordElement).toBeInTheDocument();
    });

   test("calls login with email and password", () => {

        renderWithAuth(<LoginPage />, { route: "/login" });

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "test@test.com" },
        });

        fireEvent.change(screen.getByLabelText(/^password$/i), {
            target: { value: "Abc234&5" },
        });

        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

        expect(clearAuthMessageMock).toHaveBeenCalled();

        expect(loginMock).toHaveBeenCalledWith({
            email: "test@test.com",
            password: "Abc234&5",
        });
    });

//fails because message values do not exist the message needs to fire for it to work?
/* { authMessage && (
            <p role="status" className="text-sm text-indigo-400">{authMessage.text}</p>
          )}

          { error && (
            <p role="error" className="text-sm text-indigo-400">{error}</p>
          )}
*/ 
   test("shows error message", async() => {
       
        mockUseAuth({authMessage: { text: "Invalid credentials" }});
        renderWithAuth(<LoginPage />, { route: "/login" });

        const status = await screen.findByRole("status");
        expect(status).toHaveTextContent(/invalid credentials/i);
         
    });

    test("shows local error message when login fails", async () => {
        loginMock.mockRejectedValueOnce(new Error("Invalid credentials"));

        renderWithAuth(<LoginPage />, { route: "/login" });

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "test@test.com" },
        });

        fireEvent.change(screen.getByLabelText(/^password$/i), {
            target: { value: "Abc234&56" }, // valid length
        });

        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

        const error = await screen.findByRole("error");
        expect(error).toHaveTextContent(/invalid credentials/i);
    });


});
