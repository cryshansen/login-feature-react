import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../context/AuthContext";

describe("Password reset flow", () => {
  const wrapper = ({ children }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  test("reset password success", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.resetPassword({
        email: "test7@test.com",
        password: "newpass",
        confirm: "newpass",
        token: "abc",
      });
    });

    expect(result.current.authMessage.text).toMatch(
      /password has been reset/i
    );
  });

  test("reset password fails on mismatch", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await expect(
      act(async () => {
        await result.current.resetPassword({
          email: "test@test.com",
          password: "newpass",
          confirm: "wrong",
          token: "abc",
        });
      })
    ).rejects.toThrow("Passwords do not match");
  });
});
