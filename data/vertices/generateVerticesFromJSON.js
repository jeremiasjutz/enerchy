import { IDW } from "idw";
import { readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePathProductionPlants = join(
  __dirname,
  "..",
  "electricity",
  "productionPlants.json"
);

function map({
  number,
  inputRange: [inputMin, inputMax],
  outputRange: [outputMin, outputMax],
}) {
  return (
    ((number - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
    outputMin
  );
}

export function mapLogarithmic({
  number,
  inputRange: [inputMin, inputMax],
  outputRange: [outputMin, outputMax],
}) {
  const x =
    ((number - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
    outputMin;
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

const ASPECT_SWITZERLAND = 0.63;
const SIZE = 100;
const SIZE_X = SIZE;
const SIZE_Y = SIZE * ASPECT_SWITZERLAND;

const BOUNDARIES = {
  east: {
    max: 2_833_859,
    min: 2_485_410,
  },
  north: {
    max: 1_295_934,
    min: 1_075_269,
  },
};

generateVertices();
async function generateVertices() {
  const productionPlants = JSON.parse(await readFile(filePathProductionPlants));

  const positions = productionPlants.map(([east, north]) => [
    map({
      number: east,
      inputRange: [BOUNDARIES.east.min, BOUNDARIES.east.max],
      outputRange: [0, 1],
    }),
    map({
      number: north,
      inputRange: [BOUNDARIES.north.min, BOUNDARIES.north.max],
      outputRange: [ASPECT_SWITZERLAND, 0],
    }),
  ]);

  const values = productionPlants.map(([, , kWh]) =>
    map({
      number: kWh,
      inputRange: [0, 1_872_000],
      outputRange: [0, 1],
    })
  );

  const data = {
    positions,
    values,
  };

  const idw = new IDW(data);
  idw.useTaxicabDistance();

  const coordinates = [];
  for (let j = 0; j <= 1; j += 1 / SIZE_X) {
    for (let i = 0; i <= 1; i += 1 / SIZE_Y) {
      coordinates.push([j, i]);
    }
  }

  const points = coordinates.map((point, i) => {
    console.log(`evaluating point ${i}`);
    const evaluatedPoint = idw.evaluate(point, 3);
    console.log(`done evaluating point ${i}`);
    return evaluatedPoint;
  });

  try {
    await writeFile(`${__dirname}/all.json`, JSON.stringify(points));
    console.info("all.json written successfully");
  } catch (error) {
    console.error(error);
  }
}
