import { describe, expect, it } from "vitest";
import type { Recipe, StockItem } from "../types";
import { isDishAvailable } from "./availability";

describe("isDishAvailable", () => {
  it("returns true when all ingredients are at or above par", () => {
    const stock: StockItem[] = [
      {
        name: "Paneer",
        qty: 1.4,
        unit: "kg",
        par: 0.5,
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
      ],
    };

    expect(isDishAvailable(recipe, stock)).toBe(true);
  });

  it("returns false when an ingredient is below par", () => {
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

    expect(isDishAvailable(recipe, stock)).toBe(false);
  });

  it("returns false when a recipe ingredient is missing from stock", () => {
    const stock: StockItem[] = [
      {
        name: "Butter",
        qty: 900,
        unit: "g",
        par: 200,
      },
    ];

    const recipe: Recipe = {
      dish: "Butter Naan",
      price: 70,
      ingredients: [
        {
          name: "Butter",
          qty: 12,
          unit: "g",
        },
        {
          name: "Refined Flour",
          qty: 90,
          unit: "g",
        },
      ],
    };

    expect(isDishAvailable(recipe, stock)).toBe(false);
  });

  it("returns false when one of several ingredients is below par", () => {
    const stock: StockItem[] = [
      {
        name: "Paneer",
        qty: 1.4,
        unit: "kg",
        par: 0.5,
      },
      {
        name: "Cashews",
        qty: 200,
        unit: "g",
        par: 250,
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
          name: "Cashews",
          qty: 15,
          unit: "g",
        },
      ],
    };

    expect(isDishAvailable(recipe, stock)).toBe(false);
  });

  it("considers an ingredient exactly at par available", () => {
    const stock: StockItem[] = [
      {
        name: "Paneer",
        qty: 0.5,
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
          qty: 100,
          unit: "g",
        },
      ],
    };

    expect(isDishAvailable(recipe, stock)).toBe(true);
  });
	it("makes multiple dishes unavailable when they share an ingredient below par", () => {
  const stock: StockItem[] = [
    {
      name: "Cashews",
      qty: 200,
      unit: "g",
      par: 250,
    },
  ];

  const paneerButterMasala: Recipe = {
    dish: "Paneer Butter Masala",
    price: 320,
    ingredients: [
      {
        name: "Cashews",
        qty: 15,
        unit: "g",
      },
    ],
  };

  const shahiPaneerKorma: Recipe = {
    dish: "Shahi Paneer Korma",
    price: 360,
    ingredients: [
      {
        name: "Cashews",
        qty: 40,
        unit: "g",
      },
    ],
  };

  expect(
    isDishAvailable(paneerButterMasala, stock)
  ).toBe(false);

  expect(
    isDishAvailable(shahiPaneerKorma, stock)
  ).toBe(false);
});
it("marks a dish unavailable when a required ingredient is missing from stock", () => {
  const stock: StockItem[] = [
    {
      name: "Butter",
      qty: 900,
      unit: "g",
      par: 200,
    },
  ];

  const recipe: Recipe = {
    dish: "Butter Naan",
    price: 70,
    ingredients: [
      {
        name: "Butter",
        qty: 12,
        unit: "g",
      },
      {
        name: "Refined Flour",
        qty: 90,
        unit: "g",
      },
    ],
  };

  expect(
    isDishAvailable(recipe, stock)
  ).toBe(false);
});
});
