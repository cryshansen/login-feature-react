import base from "./vitest.base.config";

export default {
  ...base,
  test: {
    ...base.test,
    environment: "jsdom",
    setupFiles: ["src/test/msw.index.ts"],
    include: ["**/*Flow*.test.{ts,tsx}", "**/*Events*.test.{ts,tsx}"],
  },
};
