import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import {  useAuth } from "../context/AuthContext";
import { TestProviders } from "./TestProviders";
import * as authService from "../api/services/auth.service";
import * as loadingContext from "../../../context/LoadingContext";
import { MessageResponse } from "../api/schemas/auth.types";

describe("AuthContext (cookie-based)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    vi.spyOn(loadingContext, "useLoading").mockReturnValue({
      loading: true,
      showLoader: vi.fn(),
      hideLoader: vi.fn(),
    });
  });



 /* ======================
    SIGNUP
  ====================== */

  it("registers a new user successfully", async () => {
    vi.spyOn(authService, "registerApi").mockResolvedValue({
      success: true,
      message: "Registration successful",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: TestProviders,
    });

    await act(async () => {
      await result.current.signup({
        email: "test15@test.com",
        firstName: "Test",
        lastName: "User",
        password: "Abc234&5",
        confirm: "Abc234&5",
      });
    });

    expect(authService.registerApi).toHaveBeenCalled();
    expect(result.current.authMessage?.type).toBe("success");
  });
 /* ======================
    Reset Password
  ====================== */
  it("requests password reset successfully", async () => {
    vi.spyOn(authService, "requestPasswordResetApi").mockResolvedValue({
      success: true,
      message: "Reset email sent",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: TestProviders,
    });

    await act(async () => {
      await result.current.requestPasswordReset({
        email: "test@test.com",
      });
    });

    expect(authService.requestPasswordResetApi).toHaveBeenCalled();
    expect(result.current.authMessage?.type).toBe("success");
  });

  it("sets error message when account does not exist", async () => {
    vi.spyOn(authService, "requestPasswordResetApi").mockResolvedValue({
      success: false,
      message: "Account does not exist. Try signup instead.",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: TestProviders,
    });

    await act(async () => {
      await result.current.requestPasswordReset({
        email: "missing@test.com",
      });
    });

    expect(result.current.authMessage?.type).toBe("error");
    expect(result.current.authMessage?.text).toMatch(/does not exist/i);
  });

/*
sample for captcha failure. this is not currently implemented in the service.
  it("handles invalid captcha response", async () => {
    vi.spyOn(authService, "requestPasswordResetApi").mockResolvedValue({
      success: false,
      message: "Invalid reCAPTCHA.",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: TestProviders,
    });

    await act(async () => {
      await result.current.requestPasswordReset({
        email: "test@test.com",
      });
    });

    expect(result.current.authMessage?.type).toBe("error");
    expect(result.current.authMessage?.text).toMatch(/captcha/i);
  });*/

 /* ======================
     Confirm reset password
  ====================== */
it("throws when passwords do not match", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestProviders,
    });

    await expect(
      act(() =>
        result.current.resetPassword({
          email: "test@test.com",
          password: "abc",
          confirm: "xyz",
          token: "t",
          tokenUrl: "u",
        })
      )
    ).rejects.toThrow("Passwords do not match");
  });

  it("calls confirmPasswordResetApi and sets success message", async () => {
    vi.spyOn(authService, "confirmPasswordResetApi").mockResolvedValue({
      success: true,
      message: "Password reset successful",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: TestProviders,
    });

    await act(async () => {
      await result.current.resetPassword({
        email: "test@test.com",
        password: "abc123",
        confirm: "abc123",
        token: "token",
        tokenUrl: "jwt",
      });
    });

    expect(authService.confirmPasswordResetApi).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "abc123",
      token: "token",
      tokenUrl: "jwt",
    });

    expect(result.current.authMessage?.type).toBe("success");
  });

  it("sets error message when API returns failure", async () => {
    vi.spyOn(authService, "confirmPasswordResetApi").mockResolvedValue({
      success: false,
      message: "Token expired",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: TestProviders,
    });

    await act(async () => {
      await result.current.resetPassword({
        email: "test@test.com",
        password: "abc123",
        confirm: "abc123",
        token: "bad",
        tokenUrl: "jwt",
      });
    });

    expect(result.current.authMessage?.type).toBe("error");
    expect(result.current.authMessage?.text).toMatch(/token expired/i);
  });

 /* ======================
    verify email
  ====================== */

it("verifies email successfully", async () => {
    vi.spyOn(authService, "verifyEmailApi").mockResolvedValue({
      success: true,
      message: "Email verified",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: TestProviders,
    });

    await act(async () => {
      await result.current.verifyEmailAccount({
        email: "test@test.com",
        token: "token",
        tokenUrl: "jwt",
      });
    });

    expect(authService.verifyEmailApi).toHaveBeenCalledWith({
      email: "test@test.com",
      token: "token",
      jwttoken: "jwt",
    });

    expect(result.current.authMessage?.type).toBe("success");
  });

  it("sets error message when verification fails", async () => {
      vi.spyOn(authService, "verifyEmailApi").mockResolvedValue({
        success: false,
        message: "Invalid verification link",
      });

      const { result } = renderHook(() => useAuth(), {
        wrapper: TestProviders,
      });

      await act(async () => {
        await result.current.verifyEmailAccount({
          email: "test@test.com",
          token: "bad",
          tokenUrl: "jwt",
        });
      });

      expect(result.current.authMessage?.type).toBe("error");
    });

/* ======================
   AUTH READY FLAG 
   Catches flicker issues with GuardLoader
   Validates session initialization state
====================== */

    it("authReady transitions from false → true during bootstrap", async () => {
      vi.spyOn(authService, "meApi").mockResolvedValue({
        id: 1,
        email: "state@test.com",
        emailVerified: true,
      });

      const { result } = renderHook(() => useAuth(), { wrapper: TestProviders });

      // initial state
      expect(result.current.authReady).toBe(false);

      // wait for session resolution
      await waitFor(() => expect(result.current.authReady).toBe(true));

      // state after resolution
      expect(result.current.authuser?.email).toBe("state@test.com");
    });

});
