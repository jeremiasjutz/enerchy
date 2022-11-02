import { ASPECT_SWITZERLAND, BOUNDARIES, SIZE } from "./constants";
import productionPlants from "./assets/productionPlants.json";
import { linearInterpolation } from "./utils/interpolations";

type ProductionPlant = [number, number, number, number, number, string];

export default function generateHeatmapData() {
  const arr = Array.from(Array(SIZE * ASPECT_SWITZERLAND), () =>
    new Array(SIZE).fill(0)
  );

  for (const [east, north, kWh] of productionPlants as ProductionPlant[]) {
    if (kWh > 0 && kWh < 1000) {
      const indexX = Math.round(
        linearInterpolation({
          number: east,
          inputRange: [BOUNDARIES.east.min, BOUNDARIES.east.max],
          outputRange: [0, SIZE - 1],
        })
      );
      const indexY = Math.round(
        linearInterpolation({
          number: north,
          inputRange: [BOUNDARIES.north.min, BOUNDARIES.north.max],
          outputRange: [SIZE * ASPECT_SWITZERLAND - 1, 0],
        })
      );

      arr[indexY][indexX] = Math.max(
        arr[indexY][indexX],
        linearInterpolation({
          number: kWh,
          inputRange: [0, 1_872_000],
          outputRange: [0, 50],
        })
      );
    }
  }

  const x = SIZE;
  const y = x * ASPECT_SWITZERLAND;

  for (let k = 0; k < 2; k++) {
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        if (i > 0 && i < y - 1 && j > 0 && j < x - 1) {
          arr[i][j] = ~~(
            (arr[i - 1][j] + arr[i + 1][j] + arr[i][j - 1] + arr[i][j + 1]) /
            4
          );
        }
      }
    }
  }

  return arr.flat();
}
