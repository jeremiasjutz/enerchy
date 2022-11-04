import { useFrame } from "@react-three/fiber";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Mesh } from "three";

import { ASPECT_SWITZERLAND, BOUNDARIES, SIZE } from "../constants";
import generateHeatmapVertexValues from "../heatmap";
import productionPlants from "../assets/productionPlants.json";
import { ProductionPlant } from "../types";
import { linearInterpolation } from "../utils/interpolations";

export default function HeatMap({
  minPower,
  maxPower,
  categoryWaterPowerEnabled,
  categoryPhotovoltaicEnabled,
  categoryWindEnergyEnabled,
  categoryBiomassEnabled,
  categoryOilEnabled,
  categoryGasEnabled,
  categoryWasteEnabled,
  categoryNuclearEnergyEnabled,
}: {
  minPower: number;
  maxPower: number;
  categoryWaterPowerEnabled: boolean;
  categoryPhotovoltaicEnabled: boolean;
  categoryWindEnergyEnabled: boolean;
  categoryBiomassEnabled: boolean;
  categoryOilEnabled: boolean;
  categoryGasEnabled: boolean;
  categoryWasteEnabled: boolean;
  categoryNuclearEnergyEnabled: boolean;
}) {
  const mesh = useRef<Mesh>(null);
  const isVerticesSet = useRef(false);

  useFrame(() => {
    if (mesh.current && !isVerticesSet.current) {
      console.time("generateHeatmapVertexValues");
      const vertexValues = generateHeatmapVertexValues({
        array: generatePowerValueArray(),
      });
      console.timeEnd("generateHeatmapVertexValues");

      const { geometry } = mesh.current;
      const { position } = geometry.attributes;

      for (let index = 0; index < position.count; index++) {
        // @ts-ignore
        position.array[index * 3 + 2] = vertexValues[index] * 0.05;
      }
      isVerticesSet.current = true;
    }
  });
  return (
    <>
      <directionalLight color={0xffffff} />
      <mesh ref={mesh} rotation={[-Math.PI / 3, 0, 0]}>
        <planeGeometry
          args={[
            1,
            ASPECT_SWITZERLAND,
            SIZE - 1,
            SIZE * ASPECT_SWITZERLAND - 1,
          ]}
        />
        <meshStandardMaterial flatShading />
      </mesh>
    </>
  );
}

function generatePowerValueArray(inputArraySize = 100) {
  const inputArray = Array.from(
    Array(Math.round(inputArraySize * ASPECT_SWITZERLAND)),
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
          outputRange: [0, Math.round(inputArraySize * ASPECT_SWITZERLAND) - 1],
        })
      );

      inputArray[indexY][indexX] = Math.max(inputArray[indexY][indexX], kWh);
    }
  }
  return inputArray;
}
