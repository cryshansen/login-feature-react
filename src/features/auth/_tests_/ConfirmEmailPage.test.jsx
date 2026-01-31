import React from 'react';
import { vi } from "vitest";
import { screen } from "@testing-library/react";
import ConfirmEmailPage from "../pages/ConfirmEmailPage";
import { renderWithAuth } from "./test-utils";

vi.mock("../context/AuthContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

import { useAuth } from "../context/AuthContext";

const mockVerifyEmailAccount = vi.fn();

describe("ConfirmEmailPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("successful confirmation of email", async () => {
    useAuth.mockReturnValue({
      verifyEmailAccount: mockVerifyEmailAccount.mockResolvedValueOnce(),
      authMessage: {
        type: "success",
        text: "Email verified successfully",
      },
    });

    renderWithAuth(<ConfirmEmailPage />, {
      route: "/verify?token=abc123&email=test7@test.com",
    });

    const status = await screen.findByRole("success");
    expect(status).toHaveTextContent(/ok/i);
  });

  test("failed email confirmation", async () => {
    useAuth.mockReturnValue({
      verifyEmailAccount: mockVerifyEmailAccount.mockRejectedValueOnce(
        new Error("Invalid token")
      ),
      authMessage: {
        type: "error",
        text: "Invalid or expired verification link.",
      },
    });

    renderWithAuth(<ConfirmEmailPage />, {
      route: "/verify?token=invalid&email=test@test.com",
    });

    const status = await screen.findByRole("failure");
    expect(status).toHaveTextContent(/ouch/i);
  });

  test("shows error when token is missing", async () => {
    useAuth.mockReturnValue({
      verifyEmailAccount: mockVerifyEmailAccount,
      authMessage: null,
    });

    renderWithAuth(<ConfirmEmailPage />, {
      route: "/verify?email=test@test.com",
    });

    const error = await screen.findByRole("error");
    expect(error).toHaveTextContent(/invalid or expired/i);

    expect(mockVerifyEmailAccount).not.toHaveBeenCalled();
  });
});
