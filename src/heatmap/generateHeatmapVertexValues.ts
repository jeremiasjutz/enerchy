import { ASPECT_SWITZERLAND, MAX_VALUE, SIZE } from "../constants";

export default function generateHeatmapVertexValues({
  array,
  outputArrayRowSize = SIZE * ASPECT_SWITZERLAND,
}: {
  array: any[][];
  outputArrayRowSize?: number;
}) {
  const rows = array.length;
  const cols = array[0].length;
  const numberOfNeighborsToConsider = 2;

  const outputArrayScaleFactor = Math.round(outputArrayRowSize / rows);
  const outputArrayColumnSize = outputArrayScaleFactor * cols;
  const halfOutputArrayScaleFactor = outputArrayScaleFactor / 2;

  const k = 1 / Math.pow((outputArrayScaleFactor * Math.sqrt(2)) / 2, 2);
  let maxZ = 0;

  const outputArray = Array.from(Array(outputArrayRowSize), () =>
    new Array(outputArrayColumnSize).fill(0)
  );

  for (let y = 0; y < outputArrayRowSize; y++) {
    for (let x = 0; x < outputArrayColumnSize; x++) {
      let z = 0;
      const i0 =
        Math.floor(y / outputArrayScaleFactor) - numberOfNeighborsToConsider;
      const j0 =
        Math.floor(x / outputArrayScaleFactor) - numberOfNeighborsToConsider;
      for (let i = i0; i <= i0 + 2 * numberOfNeighborsToConsider; i++) {
        for (let j = j0; j <= j0 + 2 * numberOfNeighborsToConsider; j++) {
          if (i >= 0 && i < rows && j >= 0 && j < cols) {
            if (array[i][j] > 0) {
              const n = array[i][j];
              const jx =
                j * outputArrayScaleFactor + halfOutputArrayScaleFactor;
              const iy =
                i * outputArrayScaleFactor + halfOutputArrayScaleFactor;
              const xPart = Math.pow(2, -k * Math.pow(x - jx, 2));
              const yPart = Math.pow(2, -k * Math.pow(y - iy, 2));
              z += n * xPart * yPart;
            }
          }
        }
      }
      if (z > maxZ) {
        maxZ = z;
      }

      outputArray[outputArrayRowSize - y - 1][x] = z;
    }
  }

  return {
    vertexValues: outputArray.flat().map((number) => number / MAX_VALUE),
    maxValueInSelection: maxZ,
  };
}
