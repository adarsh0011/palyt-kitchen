
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

  
  const [editingIngredient, setEditingIngredient] =
    useState<string | null>(null);

  const [editQty, setEditQty] = useState("");
  const [editPar, setEditPar] = useState("");

  
  const [showAddForm, setShowAddForm] = useState(false);

  const [newName, setNewName] = useState("");
  const [newQty, setNewQty] = useState("");
  const [newUnit, setNewUnit] =
    useState<StockItem["unit"]>("g");
  const [newPar, setNewPar] = useState("");

  
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


  function handleEdit(item: StockItem) {
    setEditingIngredient(item.name);
    setEditQty(String(item.qty));
    setEditPar(String(item.par));
  }

  function handleSaveEdit(itemName: string) {
    const quantity = Number(editQty);
    const par = Number(editPar);

    if (!Number.isFinite(quantity) || quantity < 0) {
      alert("Quantity must be a non-negative number.");
      return;
    }

    if (!Number.isFinite(par) || par < 0) {
      alert("Par level must be a non-negative number.");
      return;
    }

    setStock((currentStock) =>
      currentStock.map((item) =>
        item.name === itemName
          ? {
              ...item,
              qty: quantity,
              par,
            }
          : item
      )
    );

    setEditingIngredient(null);
  }

 
  function handleAddIngredient() {
    const name = newName.trim();
    const quantity = Number(newQty);
    const par = Number(newPar);

    if (!name) {
      alert("Ingredient name is required.");
      return;
    }

    const duplicate = stock.some(
      (item) =>
        item.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
      alert("An ingredient with this name already exists.");
      return;
    }

    if (!Number.isFinite(quantity) || quantity < 0) {
      alert("Quantity must be a non-negative number.");
      return;
    }

    if (!Number.isFinite(par) || par < 0) {
      alert("Par level must be a non-negative number.");
      return;
    }

    const newIngredient: StockItem = {
      name,
      qty: quantity,
      unit: newUnit,
      par,
    };

    setStock((currentStock) => [
      ...currentStock,
      newIngredient,
    ]);

   
    setNewName("");
    setNewQty("");
    setNewUnit("g");
    setNewPar("");
    setShowAddForm(false);
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Palyt Kitchen</h1>
        <p>Inventory and menu management</p>
      </header>

      <div className="dashboard">
      

        <section className="panel">
          <div className="section-header">
            <h2>Stock</h2>

            <button
              onClick={() =>
                setShowAddForm((current) => !current)
              }
            >
              {showAddForm ? "Cancel" : "Add ingredient"}
            </button>
          </div>

        

          {showAddForm && (
            <div className="ingredient-form">
              <h3>Add ingredient</h3>

              <label>
                Name
                <input
                  type="text"
                  value={newName}
                  onChange={(event) =>
                    setNewName(event.target.value)
                  }
                  placeholder="Ingredient name"
                />
              </label>

              <label>
                Quantity
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={newQty}
                  onChange={(event) =>
                    setNewQty(event.target.value)
                  }
                  placeholder="Quantity"
                />
              </label>

              <label>
                Unit
                <select
                  value={newUnit}
                  onChange={(event) =>
                    setNewUnit(
                      event.target.value as StockItem["unit"]
                    )
                  }
                >
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="ml">ml</option>
                  <option value="L">L</option>
                </select>
              </label>

              <label>
                Par
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={newPar}
                  onChange={(event) =>
                    setNewPar(event.target.value)
                  }
                  placeholder="Par level"
                />
              </label>

              <button onClick={handleAddIngredient}>
                Add ingredient
              </button>
            </div>
          )}

          

          <div className="stock-list">
            {stock.map((item) => (
              <div className="stock-row" key={item.name}>
                {editingIngredient === item.name ? (
                  <>
                    <div>
                      <strong>{item.name}</strong>
                    </div>

                    <label>
                      Quantity
                      <div className="input-with-unit">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={editQty}
                          onChange={(event) =>
                            setEditQty(event.target.value)
                          }
                        />
                        <span>{item.unit}</span>
                      </div>
                    </label>

                    <label>
                      Par
                      <div className="input-with-unit">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={editPar}
                          onChange={(event) =>
                            setEditPar(event.target.value)
                          }
                        />
                        <span>{item.unit}</span>
                      </div>
                    </label>

                    <div>
                      <button
                        onClick={() =>
                          handleSaveEdit(item.name)
                        }
                      >
                        Save
                      </button>

                      <button
                        onClick={() =>
                          setEditingIngredient(null)
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>{item.name}</strong>
                    </div>

                    <div>
                      {item.qty} {item.unit}
                    </div>

                    <div>
                      Par: {item.par} {item.unit}
                    </div>

                    <button
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

   

        <section className="panel">
          <h2>Menu</h2>

          <div className="menu-list">
            {recipes.map((recipe) => {
              const available = isDishAvailable(
                recipe,
                stock
              );

              return (
                <div
                  className="menu-row"
                  key={recipe.dish}
                >
                  <div className="menu-info">
                    <strong>{recipe.dish}</strong>
                    <span>₹{recipe.price}</span>
                  </div>

                  <div className="menu-actions">
                    <span
                      className={
                        available
                          ? "status available"
                          : "status unavailable"
                      }
                    >
                      {available
                        ? "Available"
                        : "Unavailable"}
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

