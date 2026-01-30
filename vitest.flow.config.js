import base from "./vitest.base.config";

export default {
  ...base,
  test: {
    ...base.test,
    environment: "jsdom",
    setupFiles: ["src/test/msw.setup.ts"],
    include: ["**/*Flow*.test.{ts,tsx}", "**/*Events*.test.{ts,tsx}"],
  },
};
