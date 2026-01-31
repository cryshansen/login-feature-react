import { defineConfig } from "vitest/config";
import base from "./vitest.base.config";

export default defineConfig ({
  ...base,
  test: {
    ...base.test,
    include: [], // prevents accidental test execution
  },
});
