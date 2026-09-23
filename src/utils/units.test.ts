import { describe, expect, it } from "vitest";
import { convertQuantity } from "./units";

describe("convertQuantity", () => {
  it("converts kilograms to grams", () => {
    expect(convertQuantity(1.4, "kg", "g")).toBe(1400);
  });

  it("converts grams to kilograms", () => {
    expect(convertQuantity(180, "g", "kg")).toBe(0.18);
  });

  it("converts litres to millilitres", () => {
    expect(convertQuantity(1.5, "L", "ml")).toBe(1500);
  });

  it("returns the same quantity when units are identical", () => {
    expect(convertQuantity(500, "g", "g")).toBe(500);
  });

  it("rejects incompatible units", () => {
    expect(() => convertQuantity(1, "kg", "ml")).toThrow();
  });
});
