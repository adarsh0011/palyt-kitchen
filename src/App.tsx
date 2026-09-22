import stockData from "./data/stock.json";
import recipeData from "./data/recipes.json";

import type { StockItem, Recipe } from "./types";

function App() {
  const stock = stockData as StockItem[];
  const recipes = recipeData as Recipe[];

  return (
    <div>
      <h1>Palyt Kitchen</h1>

      <p>Ingredients: {stock.length}</p>
      <p>Dishes: {recipes.length}</p>
    </div>
  );
}

export default App;
