import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

import { ASPECT_SWITZERLAND, SIZE } from "./constants";
import generateHeatmapVertexValues from "./heatmap";

export default function App() {
  const mesh = useRef<Mesh>(null);
  const isVerticesSet = useRef(false);
  const texture = useTexture("/switzerland.png");

  useFrame(() => {
    if (mesh.current && !isVerticesSet.current) {
      const vertexValues = generateHeatmapVertexValues();

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
