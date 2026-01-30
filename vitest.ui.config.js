import base from "./vitest.base.config";

export default {
  ...base,
  test: {
    ...base.test,
    environment: "jsdom",
    include: ["**/*Page*.test.{js,jsx}", "**/*Form*.test.{js,jsx}"],
  },
};

