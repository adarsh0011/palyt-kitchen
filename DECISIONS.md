# Implementation Decisions

## Inventory and menu availability

I treated the par level as the threshold used for menu availability. A dish is available when every ingredient required by its recipe exists in stock and the current stock quantity is at or above that ingredient's par level.

After an order, stock is deducted using the recipe quantities. If the deduction causes an ingredient to fall below its par, the affected dishes automatically become unavailable.

## Ingredient deletion

I chose to prevent deletion of ingredients that are referenced by recipes. For example, Cashews are used by multiple dishes, so deleting Cashews would leave those recipes referencing an ingredient that no longer exists in inventory.

Ingredients that are not referenced by any recipe, such as Bay Leaves in the supplied data, can be deleted.

## Missing ingredients

If a recipe references an ingredient that is not present in stock, I treat the dish as unavailable rather than assuming that the ingredient is available.

This applies to Butter Naan, whose recipe references Refined Flour while Refined Flour is not present in the supplied stock data.

## Units

Stock quantities and recipe quantities can use different units. I therefore keep each stock item in its original unit and convert recipe quantities when performing comparisons or deductions.

The implementation supports mass conversions between grams and kilograms and volume conversions between millilitres and litres. Mass-to-volume conversion is rejected because the supplied data does not provide density information.

## Validation

Ingredient names must be present and unique, while quantity and par values must be non-negative numbers. Duplicate names are checked case-insensitively.

## Scope

I kept the implementation focused on the assessment requirements. The application does not add authentication, payments, database persistence, order history, or other functionality outside the requested inventory and menu workflow.

The main focus was keeping the business logic separate from the UI and covering availability, unit conversion, and stock deduction with automated tests.
