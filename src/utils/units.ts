import type { Unit } from "../types";

const conversionFactors: Record<Unit, number> = {
  g: 1,
  kg: 1000,
  ml: 1,
  L: 1000,
};

export function convertQuantity(
  quantity: number,
  from: Unit,
  to: Unit
): number {
  if (from === to) {
    return quantity;
  }

  const isMassUnit = (unit: Unit) => unit === "g" || unit === "kg";
  const isVolumeUnit = (unit: Unit) => unit === "ml" || unit === "L";

  if (isMassUnit(from) && isMassUnit(to)) {
    return (quantity * conversionFactors[from]) / conversionFactors[to];
  }

  if (isVolumeUnit(from) && isVolumeUnit(to)) {
    return (quantity * conversionFactors[from]) / conversionFactors[to];
  }

  throw new Error(`Cannot convert ${from} to ${to}`);
}
