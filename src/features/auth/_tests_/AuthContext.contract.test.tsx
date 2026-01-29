import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAuth } from "../context/AuthContext";
import { TestProviders } from "./TestProviders";
import * as authService from "../api/services/auth.service";
import * as loadingContext from "../../../context/LoadingContext";

/* =====================================================
    CONTRACT TESTS LOCKS DOWN PUBLIC GUARANTEES
    Contract tests are still context tests — just written from the consumer’s perspective instead of the implementer’s.
===================================================== */

describe("AuthContext contract (cookie-based)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    // Silence loader side effects
    vi.spyOn(loadingContext, "useLoading").mockReturnValue({
      loading: true,
      showLoader: vi.fn(),
      hideLoader: vi.fn(),
    });
  });
/* ======================
   LOGIN
====================== */

  it("login returns MessageResponse and resolves /me identity", async () => {
    // CONTRACT: login endpoint
    vi.spyOn(authService, "loginApi").mockResolvedValue({
      success: true,
      message: "You signed in!",
    });

    // CONTRACT: identity comes from /me
    vi.spyOn(authService, "meApi").mockResolvedValue({
      id: 1,
      email: "test2@test.com",
      emailVerified: true,
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: TestProviders,
    });

    let res;
    await act(async () => {
      res = await result.current.login({
        email: "test2@test.com",
        password: "Abc234&5",
      });
    });

    // CONTRACT: login returns MessageResponse
    expect(res).toEqual(
      expect.objectContaining({
        message: "You signed in!",
      })
    );

    // CONTRACT: identity is resolved via /me
    await waitFor(() =>
      expect(result.current.authuser).toEqual(
        expect.objectContaining({
          email: "test2@test.com",
          emailVerified: true,
        })
      )
    );

    // CONTRACT: message union is respected
    expect(result.current.authMessage?.type).toBe("success");
  });


  
    /* ======================
       LOGOUT
    ====================== */
  it("logout clears identity and emits success message", async () => {
    vi.spyOn(authService, "logoutApi").mockResolvedValue({
      success: true,
      message: "Logged out successfully",
    });
  
    vi.spyOn(authService, "meApi").mockResolvedValue({
      //success: true,
      id: 1, email: "test7@test.com" , emailVerified: true
    });
  
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestProviders,
    });
  
    // ⬅️ wait for initial session resolution
    await waitFor(() => {
      expect(result.current.authReady).toBe(true);
    });
  
    await act(async () => {
      await result.current.logout();
    });
  
    expect(result.current.authuser).toBeNull();
    expect(result.current.authMessage?.type).toBe("success");
  });
  
});
