import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginApi } from "../api/services/auth.service";

const mockFetch = vi.fn();

global.fetch = mockFetch as any;

describe("auth.service login()", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("returns parsed JSON on success", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      headers: {
        get: () => "application/json",
      },
      json: async () => ({
        success: true,
        message: "Login successful",
      }),
    });

    const result = await loginApi({
      username: "test@test.com",
      password: "pass123",
      token: "fake",
    });

    expect(fetch).toHaveBeenCalledOnce();
    expect(result.message).toBe("Login successful");
    
  });

  it("throws when API returns error JSON", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      headers: {
        get: () => "application/json",
      },
      json: async () => ({
        error: "Invalid credentials",
      }),
    });

    await expect(
      loginApi({
        username: "bad@test.com",
        password: "wrong",
        token: "fake",
      })
    ).rejects.toThrow("Invalid credentials");
  });

  it("throws on network failure", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    await expect(
      loginApi({
        username: "test@test.com",
        password: "pass123",
        token: "fake",
      })
    ).rejects.toThrow("Network error");
  });
});