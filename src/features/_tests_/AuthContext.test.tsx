import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AuthProvider, useAuth } from "../../context/AuthContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("AuthContext (cookie-based)", () => {
  /* ======================
     BOOTSTRAP (/me)
  ====================== */

  it("sets authuser when /me succeeds", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.authReady).toBe(true);
    });

    expect(result.current.authuser).toEqual({
      id: 1,
      email: "me@test.com",
      emailVerified: true,
    });
  });

  it("sets authuser to null when unauthenticated", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.authReady).toBe(true);
    });

    expect(result.current.authuser).toBeNull();
  });

  /* ======================
     LOGIN
  ====================== */

  it("logs in and resolves session via /me", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({
        email: "me@test.com",
        password: "password",
      });
    });

    expect(result.current.authuser?.email).toBe("me@test.com");
    expect(result.current.authMessage?.type).toBe("success");
  });

  /* ======================
     LOGOUT
  ====================== */

  it("clears authuser on logout", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({
        email: "me@test.com",
        password: "password",
      });
    });

    expect(result.current.authuser).not.toBeNull();

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.authuser).toBeNull();
    expect(result.current.authMessage?.type).toBe("success");
  });
});
