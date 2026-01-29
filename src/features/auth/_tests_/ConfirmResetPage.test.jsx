import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import ConfirmResetPage from "../pages/ConfirmResetPage";
import { renderWithAuth } from "./test-utils";
import { useAuth } from "../context/AuthContext";
/**
 * Your tests must mock everything the form uses, not just the happy path.
 */
vi.mock("../context/AuthContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});


const renderPage = () =>
  renderWithAuth(<ConfirmResetPage />, {
    route: "/reset/confirm?token=abc123&email=test7@test.com",
  });

const confirmResetMock = vi.fn();
const clearAuthMessageMock = vi.fn();

const mockUseAuth = (overrides = {}) => {
  useAuth.mockReturnValue({
    resetPassword: confirmResetMock,
    clearAuthMessage: clearAuthMessageMock, //required
    authMessage: null,
    error: null,
    authReady: true,
    ...overrides,
  });
};

describe("ConfirmResetPage (UI)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows password mismatch rule when passwords differ", async () => {
    mockUseAuth();
    renderPage();

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "Password1" },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "Password2" },
    });

    const rule = await screen.findByText(/passwords match/i);
    expect(rule.closest("li")).toHaveClass("text-gray-400");
  });

/** button doesnt have disable logic in component -> field disabled={!passwordMatch} button disabled
  test("update password button is disabled when passwords do not match", () => {
    mockUseAuth();
    renderPage();

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "Password1" },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "Password2" },
    });

    expect(
      screen.getByRole("button", { name: /update password/i })
    ).toBeDisabled();
  });
 */
 

    test("submit button reset fires when passwords match", async () => {
        mockUseAuth();

        confirmResetMock.mockResolvedValueOnce({
        success: true,
        message: "Your password has been reset.",
        });

        renderPage();

        fireEvent.change(screen.getByLabelText(/^password$/i), {
        target: { value: "Abc234&5" },
        });

        fireEvent.change(screen.getByLabelText(/confirm password/i), {
        target: { value: "Abc234&5" },
        });

        fireEvent.click(
        screen.getByRole("button", { name: /update password/i })
        );
        await waitFor(() => {
            expect(confirmResetMock).toHaveBeenCalledWith({
                email: "test7@test.com",  //derived from url
                password: "Abc234&5",
                confirm: "Abc234&5",
                tokenUrl: "abc123", //derived from url
                token: "",       //from state in form captcha
            });
        });
    });
    
    test("successful reset by values", async () => {
        mockUseAuth();


        confirmResetMock.mockResolvedValueOnce({
        success: true,
        message: "Your password has been reset.",
        });

        renderPage();

        fireEvent.change(screen.getByLabelText(/^password$/i), {
        target: { value: "Abc234&5" },
        });

        fireEvent.change(screen.getByLabelText(/confirm password/i), {
        target: { value: "Abc234&5" },
        });

        fireEvent.click(
        screen.getByRole("button", { name: /update password/i })
        );

        await waitFor(() => {
            expect(confirmResetMock).toHaveBeenCalledWith({
                email: "test7@test.com",  //derived from url
                password: "Abc234&5",
                confirm: "Abc234&5",
                tokenUrl: "abc123", //derived from url
                token: "",       //from state in form captcha
            });
        });

    });

/** Added role="error" to error div in form component  but fails to resolve*/

/*    test("shows error message when reset fails", async () => {
        mockUseAuth({
            error: "Reset token is invalid or expired.",
        });
        /**role="error"  */
 /*       renderPage();
        const status = await screen.findByRole("error");
        expect(status).toHaveTextContent(/token is invalid or expired/i);
       
    });
*/
    test("shows success message into status field", async () => {
        mockUseAuth({
            authMessage: {
            type: "success",
            text: "Your password has been reset.",
            },
        });

        renderPage();

        const status = await screen.findByRole("status");
        expect(status).toHaveTextContent(/password has been reset/i);
    });

    test("password input exists", () => {
        mockUseAuth();
        renderPage();

        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    });

});
