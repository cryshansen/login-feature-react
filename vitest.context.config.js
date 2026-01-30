import base from "./vitest.base.config";

export default {
  ...base,
  test: {
    ...base.test,
    environment: "jsdom",
    setupFiles: ["src/test/msw.setup.ts"],
    include: ["**/*Context*.test.{ts,tsx}"],
  },
};
