import { ASPECT_SWITZERLAND, BOUNDARIES, SIZE } from "./constants";
import productionPlants from "./assets/productionPlants.json";
import { linearInterpolation } from "./utils/interpolations";

type ProductionPlant = [number, number, number, number, number, string];

export default function generateHeatmapVertexValues() {
  const powerValues = generatePowerValueArray();
  return new HeatMap({
    array: powerValues,
    epsilon: 2,
    pixelSize: 1,
  }).calculateAndReturnVertexValues();
}

function generatePowerValueArray(inputArraySize = 100) {
  const inputArray = Array.from(
    Array(inputArraySize * ASPECT_SWITZERLAND),
    () => new Array(inputArraySize).fill(0)
  );

  for (const [east, north, kWh] of productionPlants as ProductionPlant[]) {
    if (false || (kWh > 0 && kWh < 1000)) {
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

      inputArray[indexY][indexX] = Math.max(inputArray[indexY][indexX], kWh);
    }
  }
  return inputArray;
}

class HeatMap {
  array: any[][];
  rows: number;
  cols: number;
  arrayMax: number;
  arrayMin: number;
  copy: any[][];
  epsilon: number;
  pixelSize: number;

  constructor({
    array,
    epsilon,
    pixelSize,
  }: {
    array: any[][];
    epsilon?: number;
    pixelSize?: number;
  }) {
    this.array = array;
    this.rows = this.array.length;
    this.cols = this.array[0].length;

    this.arrayMax = this.array[0][0];
    this.arrayMin = this.arrayMax;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.arrayMax = Math.max(this.array[i][j], this.arrayMax);
        this.arrayMin = Math.min(this.array[i][j], this.arrayMin);
      }
    }

    this.copy = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      this.copy[i] = new Array(this.cols);
      for (let j = 0; j < this.cols; j++) {
        this.copy[i][j] = this.array[i][j] - this.arrayMin;
      }
    }

    this.epsilon = epsilon === undefined ? 2 : epsilon; // how many nearby values to consider, i.e., smoothness
    this.pixelSize = pixelSize === undefined ? 1 : pixelSize; // larger pixels, faster generation
  }

  calculateAndReturnVertexValues(
    outputArrayRowSize = SIZE * ASPECT_SWITZERLAND
  ) {
    const d = outputArrayRowSize / this.rows;
    const width = d * this.cols;
    const halfD = d / 2;

    const k = 1 / Math.pow((d * Math.sqrt(2)) / 2, 2);
    let maxZ = 0;

    let arr = new Array(outputArrayRowSize);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(width).fill(0);
    }

    for (let y = 0; y < outputArrayRowSize; y += this.pixelSize) {
      for (let x = 0; x < width; x += this.pixelSize) {
        let z = 0;

        const i0 = ~~(y / d) - this.epsilon;
        const j0 = ~~(x / d) - this.epsilon;
        for (let i = i0; i <= i0 + 2 * this.epsilon; i++) {
          for (let j = j0; j <= j0 + 2 * this.epsilon; j++) {
            if (i >= 0 && i < this.rows && j >= 0 && j < this.cols) {
              if (this.copy[i][j] > 0) {
                const n = this.copy[i][j];
                const jx = j * d + halfD;
                const iy = i * d + halfD;
                const xPart = Math.pow(2, -k * Math.pow(x - jx, 2));
                const yPart = Math.pow(2, -k * Math.pow(y - iy, 2));
                z += n * xPart * yPart;
              }
            }
          }
        }
        if (z > maxZ) maxZ = z;
        // z = z / maxZ;
        // if (z > 0.002) {
        arr[outputArrayRowSize - y - this.pixelSize][x] = z;
        // }
      }
    }
    // for (let y = 0; y < outputArrayRowSize; y += this.pixelSize) {
    //   for (let x = 0; x < width; x += this.pixelSize) {
    //     let z = 0;

    //     const i0 = ~~(y / d) - this.epsilon;
    //     const j0 = ~~(x / d) - this.epsilon;
    //     for (let i = i0; i <= i0 + 2 * this.epsilon; i++) {
    //       for (let j = j0; j <= j0 + 2 * this.epsilon; j++) {
    //         if (i >= 0 && i < this.rows && j >= 0 && j < this.cols) {
    //           if (this.copy[i][j] > 0) {
    //             const n = this.copy[i][j];
    //             const jx = j * d + halfD;
    //             const iy = i * d + halfD;
    //             const xPart = Math.pow(2, -k * Math.pow(x - jx, 2));
    //             const yPart = Math.pow(2, -k * Math.pow(y - iy, 2));
    //             z += n * xPart * yPart;
    //           }
    //         }
    //       }
    //     }
    //     z = z / maxZ;

    //     if (z > 0.002) {
    //       arr[outputArrayRowSize - y - this.pixelSize][x] = z;
    //     }
    //   }
    // }

    return arr.flat().map((num) => num / maxZ);
  }
}
