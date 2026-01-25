import { screen, fireEvent } from "@testing-library/react";
import SignupPage from "../components/auth/SignupPage";
import { renderWithAuth } from "./test-utils";

describe("SignupPage", () => {
  test("shows password mismatch inline error", async () => {
    renderWithAuth(<SignupPage />, { route: "/signup" });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123" },
    });

    fireEvent.change(screen.getByLabelText(/confirm/i), {
      target: { value: "456" },
    });

    expect(
      await screen.findByText(/passwords do not match/i)
    ).toBeInTheDocument();
  });

  test("successful signup shows check email message", async () => {
    renderWithAuth(<SignupPage />, { route: "/signup" });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "pass123" },
    });

    fireEvent.change(screen.getByLabelText(/confirm/i), {
      target: { value: "pass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText(/check your email/i)
    ).toBeInTheDocument();
  });
});
