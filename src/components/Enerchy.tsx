import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color, DoubleSide, Float32BufferAttribute, Mesh } from "three";
import { useControls } from "leva";

import { ASPECT_SWITZERLAND, BOUNDARIES, SIZE } from "../constants";
import generateHeatmapVertexValues from "../heatmap";
import productionPlants from "../assets/productionPlants.json";
import { ProductionPlant } from "../types";
import { linearInterpolation } from "../utils/interpolations";
import { useTexture } from "@react-three/drei";

export default function Enerchy() {
  const mesh = useRef<Mesh>(null);
  const isVerticesSet = useRef(false);
  const switzerlandTexture = useTexture("/switzerland-outline.png");
  const { opacity, isMapVisible } = useControls({
    opacity: 1,
    isMapVisible: false,
  });
  useFrame(() => {
    if (mesh.current && !isVerticesSet.current) {
      const color = new Color();
      const colors: number[] = [];
      const vertexValues = generateHeatmapVertexValues({
        array: generatePowerValueArray(),
      });

      const { geometry } = mesh.current;
      for (let index = 0; index < geometry.attributes.position.count; index++) {
        const value = vertexValues[index].value * (1 / 20);

        geometry.attributes.position.setZ(index, value);
        color.setHSL(
          // @ts-ignore
          0.05,
          1,
          vertexValues[index].value
        );
        colors.push(color.r, color.g, color.b);
      }
      geometry.attributes.color = new Float32BufferAttribute(colors, 3);
      // enable shading (~100ms slower)
      geometry.computeVertexNormals();
      isVerticesSet.current = true;
    }
  });
  return (
    <>
      <directionalLight color={0xffffff} position={[-1, 1, 0]} />
      {/* <pointLight intensity={10} /> */}
      {isMapVisible && (
        <mesh ref={mesh} position={[0, 0, -0.001]}>
          <planeGeometry args={[1, ASPECT_SWITZERLAND, 1, 1]} />
          <meshBasicMaterial map={switzerlandTexture} />
        </mesh>
      )}
      <mesh ref={mesh}>
        <planeGeometry
          args={[
            1,
            ASPECT_SWITZERLAND,
            SIZE - 1,
            SIZE * ASPECT_SWITZERLAND - 1,
          ]}
        />
        <meshStandardMaterial
          vertexColors
          opacity={opacity}
          transparent
          side={DoubleSide}
        />
      </mesh>
    </>
  );
}

function generatePowerValueArray(inputArraySize = 100) {
  const inputArray = Array.from(
    Array(Math.round(inputArraySize * ASPECT_SWITZERLAND)),
    () => new Array(inputArraySize).fill({ value: 0 })
  );

  for (const [
    east,
    north,
    kWh,
    mainCat,
    subCat,
  ] of productionPlants as ProductionPlant[]) {
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

      inputArray[indexY][indexX] = {
        value: Math.max(kWh, inputArray[indexY][indexX].value),
        subCat,
      };
    }
  }

  return inputArray;
}
