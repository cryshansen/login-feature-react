import { describe, it, expect } from "vitest";
import slugify from "../utils/slugify";

describe("slugify()", () => {
  it("creates a URL-friendly slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("Anxiety & Stress")).toBe("anxiety-stress");
  });

  it("handles empty strings", () => {
    expect(slugify("")).toBe("");
  });
});


describe("slugify edge cases", () => {

    //fails
  it("handles null/undefined safely", () => {
    expect(slugify(null)).toBe("");
    expect(slugify(undefined)).toBe("");
  });

  it("removes special characters", () => {
    expect(slugify("Hello!! World??")).toBe("hello-world");
  });

  it("collapses multiple spaces", () => {
    expect(slugify("A   B   C")).toBe("a-b-c");
  });
});

describe("slugify()", () => {
  it("converts to lowercase hyphenated form", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("Calm!!! Reset???")).toBe("calm-reset");
  });
//fails
  it("handles empty values", () => {
    expect(slugify("")).toBe("");
    expect(slugify(null)).toBe("");
  });
});