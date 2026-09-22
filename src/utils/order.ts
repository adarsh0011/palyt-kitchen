import type { Recipe, StockItem } from "../types";
import { convertQuantity } from "./units";
import { isDishAvailable } from "./availability";

export function orderDish(
  recipe: Recipe,
  stock: StockItem[]
): StockItem[] {
  if (!isDishAvailable(recipe, stock)) {
    throw new Error(`${recipe.dish} is currently unavailable`);
  }

  return stock.map((stockItem) => {
    const recipeIngredient = recipe.ingredients.find(
      (ingredient) => ingredient.name === stockItem.name
    );

    if (!recipeIngredient) {
      return stockItem;
    }

    const quantityToDeduct = convertQuantity(
      recipeIngredient.qty,
      recipeIngredient.unit,
      stockItem.unit
    );

    return {
      ...stockItem,
      qty: stockItem.qty - quantityToDeduct,
    };
  });
}
