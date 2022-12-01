import pPlants from "../assets/productionPlants.json";
import { ASPECT_SWITZERLAND, BOUNDARIES } from "../constants";
import { ProductionPlant, ProductionPlantCategory } from "../types";
import {
  linearInterpolation,
  logarithmicInterpolation,
} from "../utils/interpolations";
const productionPlants = pPlants as ProductionPlant[];

export default function generatePowerValueArray({
  inputArraySize = 100,
  min = 0,
  max = 1000,
  categories = [],
}: {
  inputArraySize: number;
  min?: number;
  max?: number;
  categories?: ProductionPlantCategory[];
}) {
  const inputArray = Array.from(
    Array(Math.round(inputArraySize * ASPECT_SWITZERLAND)),
    () => new Array(inputArraySize).fill(0)
  );

  for (const [east, north, kWh, , subCat] of productionPlants) {
    if (
      kWh >= min &&
      kWh <= max &&
      categories.some((cat) => cat.id === subCat && cat.isChecked)
    ) {
      const indexX = Math.round(
        linearInterpolation({
          number: east,
          inputRange: [BOUNDARIES.east.min, BOUNDARIES.east.max],
          outputRange: [0, inputArraySize - 1],
        })
      );
      const indexY = Math.round(
        linearInterpolation({
          number: north,
          inputRange: [BOUNDARIES.north.min, BOUNDARIES.north.max],
          outputRange: [0, inputArraySize * ASPECT_SWITZERLAND - 1],
        })
      );

      const kwhInterpolated = logarithmicInterpolation({
        number: kWh,
        inputRange: [0, 1_872_000],
        outputRange: [0, 1_872_000],
      });

      inputArray[indexY][indexX] = Math.max(
        kwhInterpolated,
        inputArray[indexY][indexX]
      );
    }
  }

  return inputArray;
}
