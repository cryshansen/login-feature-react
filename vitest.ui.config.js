import {defineConfig} from "vitest/config";
import base from "./vitest.base.config";

export default defineConfig({
  ...base,
  test: {
    ...base.test,
    environment: "jsdom",
    pool:"threads",
    setupFiles: ["src/features/auth/_tests_/msw.setup.js"],
    include: ["**/*Page*.test.{js,jsx}", "**/*Form*.test.{js,jsx}"],
  },
});

