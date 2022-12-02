import pPlants from "../assets/productionPlants.json";
import { ASPECT_SWITZERLAND, BOUNDARIES, MAX_VALUE } from "../constants";
import { useStore } from "../store";
import { ProductionPlant, ProductionPlantCategoryId } from "../types";
import {
  linearInterpolation,
  logarithmicInterpolation,
} from "../utils/interpolations";
const productionPlants = pPlants as ProductionPlant[];

export default function generatePowerValueArray({
  inputArraySize = 100,
  min = 0,
  max = 1000,
  checkedCategories = [],
}: {
  inputArraySize: number;
  min?: number;
  max?: number;
  checkedCategories?: ProductionPlantCategoryId[];
}) {
  const inputArray = Array.from(
    Array(Math.round(inputArraySize * ASPECT_SWITZERLAND)),
    () => new Array(inputArraySize).fill(0)
  );
  const filteredProductionPlants = [];
  let localCategories = useStore.getState().categories.map((cat) => {
    if (checkedCategories.length > 0) {
      cat.currentAmount = 0;
      cat.totalCapacity = 0;
    }
    return cat;
  });
  if (checkedCategories.length > 0) {
    for (const productionPlant of productionPlants) {
      const [east, north, kWh, , subCat] = productionPlant;

      if (kWh >= min && kWh <= max) {
        const index = localCategories.findIndex((cat) => cat.id === subCat);
        localCategories[index].totalCapacity += kWh;
        localCategories[index].currentAmount++;

        if (checkedCategories.includes(subCat)) {
          filteredProductionPlants.push(productionPlant);
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
            inputRange: [0, MAX_VALUE],
            outputRange: [0, MAX_VALUE],
          });

          inputArray[indexY][indexX] = Math.max(
            kwhInterpolated,
            inputArray[indexY][indexX]
          );
        }
      }
    }
  }
  useStore.getState().setFilteredProductionPlants(filteredProductionPlants);
  useStore.getState().setCategories(localCategories);

  return inputArray;
}
