import type { Recipe, StockItem } from "../types";
import { convertQuantity } from "./units";

export function isDishAvailable(
  recipe: Recipe,
  stock: StockItem[]
): boolean {
  return recipe.ingredients.every((recipeIngredient) => {
    const stockItem = stock.find(
      (item) => item.name === recipeIngredient.name
    );

    if (!stockItem) {
      return false;
    }

    const stockQuantity = convertQuantity(
      stockItem.qty,
      stockItem.unit,
      recipeIngredient.unit
    );

    const parQuantity = convertQuantity(
      stockItem.par,
      stockItem.unit,
      recipeIngredient.unit
    );

    return stockQuantity >= parQuantity;
  });
}
