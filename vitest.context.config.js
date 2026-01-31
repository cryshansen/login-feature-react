import {defineConfig} from "vitest/config";
import base from "./vitest.base.config";

export default defineConfig({
  ...base,
  test: {
    ...base.test,
    environment: "jsdom",
    setupFiles: ["src/features/auth/_tests_/msw.setup.js"],
    include: ["**/*Context*.test.{ts,tsx}"],
  },
});
