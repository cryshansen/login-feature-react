import base from "./vitest.base.config";

export default {
  ...base,
  test: {
    ...base.test,
    environment: "node",
    include: ["**/*.service.test.ts"],
  },
};
