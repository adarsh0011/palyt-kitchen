import { useState } from "react";

import stockData from "./data/stock.json";
import recipeData from "./data/recipes.json";

import type { Recipe, StockItem } from "./types";
import { isDishAvailable } from "./utils/availability";
import { orderDish } from "./utils/order";

import "./App.css";

function App() {
  const [stock, setStock] = useState<StockItem[]>(
    stockData as StockItem[]
  );

  const recipes = recipeData as Recipe[];

  function handleOrder(recipe: Recipe) {
    try {
      const updatedStock = orderDish(recipe, stock);
      setStock(updatedStock);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Palyt Kitchen</h1>
        <p>Inventory and menu management</p>
      </header>

      <div className="dashboard">
        <section className="panel">
          <h2>Stock</h2>

          <div className="stock-list">
            {stock.map((item) => (
              <div className="stock-row" key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                </div>

                <div>
                  {item.qty} {item.unit}
                </div>

                <div>
                  Par: {item.par} {item.unit}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Menu</h2>

          <div className="menu-list">
            {recipes.map((recipe) => {
              const available = isDishAvailable(recipe, stock);

              return (
                <div className="menu-row" key={recipe.dish}>
                  <div>
                    <strong>{recipe.dish}</strong>
                    <span>₹{recipe.price}</span>
                  </div>

                  <div>
                    <span
                      className={
                        available
                          ? "status available"
                          : "status unavailable"
                      }
                    >
                      {available ? "Available" : "Unavailable"}
                    </span>

                    <button
                      disabled={!available}
                      onClick={() => handleOrder(recipe)}
                    >
                      Order
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
