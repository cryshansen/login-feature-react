import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AuthProvider, useAuth } from "../../context/AuthContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("AuthContext contract (cookie-based)", () => {
  it("login returns MessageResponse and resolves /me identity", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      const res = await result.current.login({
        email: "me@test.com",
        password: "password",
        token: ""
      });

      // CONTRACT: login returns MessageResponse
      expect(res).toEqual(
        expect.objectContaining({
          message: "Login successful",
        })
      );
    });

    // CONTRACT: identity comes from /me
    expect(result.current.authuser).toEqual(
      expect.objectContaining({
        email: "me@test.com",
        emailVerified: true,
      })
    );

    // CONTRACT: authMessage uses union-safe type
    expect(result.current.authMessage?.type).toBe("success");
  });

  it("unauthenticated /me sets authuser null", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.authuser).toBeNull();
    expect(result.current.authReady).toBe(true);
  });
});
