import { describe, expect, it } from "vitest";
import type { Recipe, StockItem } from "../types";
import { orderDish } from "./order";

describe("orderDish", () => {
  it("deducts all recipe ingredients from stock", () => {
    const stock: StockItem[] = [
      {
        name: "Paneer",
        qty: 1.4,
        unit: "kg",
        par: 0.5,
      },
      {
        name: "Tomatoes",
        qty: 6,
        unit: "kg",
        par: 1.5,
      },
      {
        name: "Onions",
        qty: 8,
        unit: "kg",
        par: 2,
      },
    ];

    const recipe: Recipe = {
      dish: "Paneer Butter Masala",
      price: 320,
      ingredients: [
        {
          name: "Paneer",
          qty: 180,
          unit: "g",
        },
        {
          name: "Tomatoes",
          qty: 150,
          unit: "g",
        },
        {
          name: "Onions",
          qty: 80,
          unit: "g",
        },
      ],
    };

    const updatedStock = orderDish(recipe, stock);

    expect(updatedStock[0].qty).toBeCloseTo(1.22);
    expect(updatedStock[1].qty).toBeCloseTo(5.85);
    expect(updatedStock[2].qty).toBeCloseTo(7.92);
  });

  it("does not change ingredients that are not used by the recipe", () => {
    const stock: StockItem[] = [
      {
        name: "Paneer",
        qty: 1.4,
        unit: "kg",
        par: 0.5,
      },
      {
        name: "Saffron",
        qty: 8,
        unit: "g",
        par: 5,
      },
    ];

    const recipe: Recipe = {
      dish: "Paneer Dish",
      price: 100,
      ingredients: [
        {
          name: "Paneer",
          qty: 180,
          unit: "g",
        },
      ],
    };

    const updatedStock = orderDish(recipe, stock);

    expect(updatedStock[0].qty).toBeCloseTo(1.22);
    expect(updatedStock[1].qty).toBe(8);
  });

  it("does not allow ordering an unavailable dish", () => {
    const stock: StockItem[] = [
      {
        name: "Chicken",
        qty: 0,
        unit: "kg",
        par: 1,
      },
    ];

    const recipe: Recipe = {
      dish: "Chicken Biryani",
      price: 420,
      ingredients: [
        {
          name: "Chicken",
          qty: 250,
          unit: "g",
        },
      ],
    };

    expect(() => orderDish(recipe, stock)).toThrow(
      "Chicken Biryani is currently unavailable"
    );
  });

  it("does not mutate the original stock", () => {
    const stock: StockItem[] = [
      {
        name: "Paneer",
        qty: 1.4,
        unit: "kg",
        par: 0.5,
      },
    ];

    const recipe: Recipe = {
      dish: "Paneer Dish",
      price: 100,
      ingredients: [
        {
          name: "Paneer",
          qty: 180,
          unit: "g",
        },
      ],
    };

    orderDish(recipe, stock);

    expect(stock[0].qty).toBe(1.4);
  });
});
