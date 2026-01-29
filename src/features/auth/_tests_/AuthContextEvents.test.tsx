import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAuth } from "../context/AuthContext";
import { TestProviders } from "./TestProviders";
import * as authService from "../api/services/auth.service";
import { emitAuthEvent } from "../api/services/authTelemetry.service";
import {MessageResponse} from "../api/schemas/auth.types";


describe("AuthContext events & integration flow", () => {
  
  it("emits events and handles login → logout flow", async () => {
    const emitSpy = vi.spyOn(await import("../api/services/authTelemetry.service"), "emitAuthEvent");

    // loginApi + /me
    vi.spyOn(authService, "loginApi").mockResolvedValue({
      success: true,
      message: "Login successful",
    });
    vi.spyOn(authService, "meApi").mockResolvedValue({
      id: 1,
      email: "test10@test.com",
      emailVerified: true,
    });

    // logoutApi
    vi.spyOn(authService, "logoutApi").mockResolvedValue({
      success: true,
      message: "Logged out successfully",
    });

    const { result } = renderHook(() => useAuth(), { wrapper: TestProviders });

    // wait for initial session resolution
    await waitFor(() => expect(result.current.authReady).toBe(true));

    // login
    let loginRes :MessageResponse | undefined; //.message .success?boolean
    await act(async () => {
      loginRes = await result.current.login({
        email: "test10@test.com",
        password: "Abc234&5",
      });
    });

    expect(result.current.authuser?.email).toBe("test10@test.com");
    expect(loginRes!.message).toBe("Login successful");
    expect(result.current.authMessage?.type).toBe("success");

    expect(emitSpy).toHaveBeenCalledWith("login_success");

    // logout
    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.authuser).toBeNull();
    expect(result.current.authMessage?.type).toBe("success");
    expect(emitSpy).toHaveBeenCalledWith("user_logout");
  });
});
