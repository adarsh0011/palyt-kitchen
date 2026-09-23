# Palyt Kitchen Assessment

A small React + TypeScript application for managing kitchen inventory and menu availability.

The application connects stock levels with recipes so that ordering a dish automatically deducts its ingredients and updates menu availability based on ingredient par levels.

## Tech Stack

* React
* TypeScript
* Vite
* Vitest

## Running the Application

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL shown by Vite.

## Running Tests

Run the test suite with:

```bash
npx vitest run
```

The tests cover:

* Unit conversion
* Ingredient availability
* Missing ingredients
* Stock deductions
* Orders that move stock below par
* Shared ingredients
* Immutability of stock updates

## Build

To verify the production build:

```bash
npm run build
```

## Core Business Rules

### Menu availability

A dish is available when every ingredient referenced by its recipe:

* Exists in stock
* Has current stock at or above its par level

If a recipe references an ingredient that does not exist in stock, the dish is considered unavailable.

### Ordering

When a dish is ordered:

1. The recipe is checked for availability.
2. Each recipe ingredient is deducted from stock.
3. Quantities are converted when stock and recipe units differ.
4. Menu availability is recalculated automatically from the updated stock.

An order is allowed when the dish is currently available, even if the resulting deduction causes an ingredient to fall below its par. In that case, the affected dish becomes unavailable after the order.

### Units

The application supports:

* `g` ↔ `kg`
* `ml` ↔ `L`

Mass and volume units are not converted between each other because the supplied data does not provide density information.

### Ingredient deletion

An ingredient can be deleted when it is not referenced by any recipe.

If an ingredient is used by one or more recipes, deletion is blocked and the dependent dishes are shown.

This prevents recipes from referencing ingredients that no longer exist in inventory.

## Supplied Data

The application uses the provided:

* `stock.json`
* `recipes.json`

The supplied data contains a recipe for Butter Naan that references Refined Flour, while Refined Flour is not present in the stock data. The application therefore treats Butter Naan as unavailable rather than assuming missing inventory.

## Project Structure

```text
src/
├── data/
│   ├── recipes.json
│   └── stock.json
├── utils/
│   ├── availability.ts
│   ├── availability.test.ts
│   ├── order.ts
│   ├── order.test.ts
│   ├── units.ts
│   └── units.test.ts
├── types/
│   └── index.ts
├── App.tsx
├── App.css
└── main.tsx
```

## Notes

The application intentionally keeps the scope focused on the assessment requirements. There is no authentication, database, payment flow, ordering history, or backend service.

The main goal is to demonstrate the inventory → ordering → menu availability loop with clear business logic and tests.

````

### Add it

Open your existing `README.md` and replace its contents with the above.

Then run:

```bash
git status
````

You should see only:

```text
modified: README.md
```

Then:

```bash
git add README.md
git commit -m "Document setup and business rules"
git push
```

### One important point

Don't add a huge architecture section or screenshots yet.

The assessment specifically says **clear beats polished** and asks you not to build beyond scope.

Once the README is pushed, we'll do **Step 17: the required half-page write-up**. That is where we'll explain the decisions you made—especially **Cashews vs Bay Leaves, missing Refined Flour, units, and par behavior**—in a way you can also use during the interview.
