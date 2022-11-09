import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { Color, Float32BufferAttribute, Mesh } from "three";

import { ASPECT_SWITZERLAND, SIZE } from "../constants";
import {
  generatePowerValueArray,
  generateHeatmapVertexValues,
} from "../heatmap";
import { useStore } from "../store";
import { linearInterpolation } from "../utils/interpolations";

export default function HeatMap() {
  const mesh = useRef<Mesh>(null);
  const switzerlandTexture = useTexture("/switzerland-outline.png");
  const minPower = useStore((state) => state.minPower);
  const maxPower = useStore((state) => state.maxPower);
  const categories = useStore((state) => state.categories);

  const { opacity, isMapVisible } = useControls({
    opacity: 0.9,
    isMapVisible: true,
  });

  useEffect(() => {
    const inputArraySize =
      maxPower < 100_000 ? 100 : maxPower < 1_000_000 ? 50 : 25;
    const scale = linearInterpolation({
      number: maxPower,
      inputRange: [0, 1_872_000],
      outputRange: [1 / 20, 1 / 5],
    });
    const vertexValues = generateHeatmapVertexValues({
      array: generatePowerValueArray({
        inputArraySize,
        min: minPower,
        max: maxPower,
        categories,
      }),
    });

    const color = new Color();
    const colors: number[] = [];
    const { geometry } = mesh.current!;
    for (let index = 0; index < geometry.attributes.position.count; index++) {
      const value = vertexValues[index];
      geometry.attributes.position.setZ(index, value * scale);
      color.setHSL(0.05, 1, value * 0.7);
      colors.push(color.r, color.g, color.b);
    }
    geometry.computeVertexNormals();
    geometry.attributes.color = new Float32BufferAttribute(colors, 3);
    geometry.attributes.color.needsUpdate = true;
    geometry.attributes.position.needsUpdate = true;
  }, [minPower, maxPower, categories]);

  return (
    <>
      <pointLight color={0xffffff} position={[-3, 3, 0]} />
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
          roughness={0}
          vertexColors
          opacity={opacity}
          transparent
        />
      </mesh>
    </>
  );
}
