import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import all from "./assets/all.json";
import productionPlants from "./assets/productionPlants.json";

const ASPECT_SWITZERLAND = 0.63;
const SIZE = 1000;

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

interface Mapping {
  number: number;
  inputRange: [number, number];
  outputRange: [number, number];
}

function convertNumberFromOneRangeToAnother({
  number,
  inputRange: [inputMin, inputMax],
  outputRange: [outputMin, outputMax],
}: Mapping) {
  return (
    ((number - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
    outputMin
  );
}

function mapLogarithmic({
  number,
  inputRange: [inputMin, inputMax],
  outputRange: [outputMin, outputMax],
}: Mapping) {
  const x =
    ((number - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
    outputMin;
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function bezier(
  t: number,
  initial: number,
  p1: number,
  p2: number,
  final: number
) {
  return (
    (1 - t) * (1 - t) * (1 - t) * initial +
    3 * (1 - t) * (1 - t) * t * p1 +
    3 * (1 - t) * t * t * p2 +
    t * t * t * final
  );
}

export default function App() {
  const mesh = useRef<Mesh>(null);
  const isVerticesSet = useRef(false);
  const texture = useTexture("/switzerland.png");

  useFrame(() => {
    if (mesh.current && !isVerticesSet.current) {
      const arrayToFill = Array.from(Array(SIZE * ASPECT_SWITZERLAND), () =>
        new Array(SIZE).fill(0)
      );

      for (const [east, north, kWh] of productionPlants as any[]) {
        if (true || kWh < 100) {
          const indexX = Math.round(
            convertNumberFromOneRangeToAnother({
              number: east,
              inputRange: [BOUNDARIES.east.min, BOUNDARIES.east.max],
              outputRange: [0, SIZE - 1],
            })
          );
          const indexY = Math.round(
            convertNumberFromOneRangeToAnother({
              number: north,
              inputRange: [BOUNDARIES.north.min, BOUNDARIES.north.max],
              outputRange: [SIZE * ASPECT_SWITZERLAND - 1, 0],
            })
          );

          arrayToFill[indexY][indexX] = Math.max(
            arrayToFill[indexY][indexX],
            // bezier(
            convertNumberFromOneRangeToAnother({
              number: kWh,
              inputRange: [0, 2000000],
              outputRange: [0, 1],
            })
            //   0,
            //   1,
            //   0,
            //   1
            // )
          );
        }
      }

      console.log(arrayToFill);

      const flattnedArray = arrayToFill.flat();

      const { geometry } = mesh.current;
      const { position } = geometry.attributes;

      for (let index = 0; index < position.count; index++) {
        // @ts-ignore
        position.array[index * 3 + 2] = flattnedArray[index];
      }
      isVerticesSet.current = true;
    }
  });

  return (
    <>
      <pointLight />
      <mesh ref={mesh}>
        <planeGeometry
          args={[
            1,
            ASPECT_SWITZERLAND,
            SIZE - 1,
            SIZE * ASPECT_SWITZERLAND - 1,
          ]}
        />
        <meshBasicMaterial map={texture} wireframe />
      </mesh>
    </>
  );
}
