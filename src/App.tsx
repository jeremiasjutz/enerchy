import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Euler, Mesh } from "three";

import { ASPECT_SWITZERLAND, SIZE } from "./constants";
import generateHeatmapData from "./heatmap";

export default function App() {
  const mesh = useRef<Mesh>(null);
  const isVerticesSet = useRef(false);
  const texture = useTexture("/switzerland.png");

  useFrame(() => {
    if (mesh.current && !isVerticesSet.current) {
      const array = generateHeatmapData();

      const { geometry } = mesh.current;
      const { position } = geometry.attributes;

      for (let index = 0; index < position.count; index++) {
        // @ts-ignore
        position.array[index * 3 + 2] = array[index];
      }
      isVerticesSet.current = true;
    }
  });

  return (
    <>
      <mesh ref={mesh} rotation={new Euler(-Math.PI / 3, 0, 0)}>
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
