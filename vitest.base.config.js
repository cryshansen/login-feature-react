import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react({jsxRuntime: "automatic"})],
  test: {
    globals: true,
    restoreMocks: true,
    clearMocks: true,
    mockReset: true,
  },
});
