import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { Color, DoubleSide, Float32BufferAttribute, Mesh } from "three";

import { ASPECT_SWITZERLAND, SIZE } from "../constants";
import {
  generatePowerValueArray,
  generateHeatmapVertexValues,
} from "../heatmap";

export default function HeatMap() {
  const [inputArraySize, setInputArraySize] = useState(100);
  const [scale, setScale] = useState(1 / 20);

  const mesh = useRef<Mesh>(null);
  const switzerlandTexture = useTexture("/switzerland-outline.png");

  const { opacity, isMapVisible } = useControls({
    opacity: 1,
    isMapVisible: false,
  });

  useEffect(() => {
    const vertexValues = generateHeatmapVertexValues({
      array: generatePowerValueArray({ inputArraySize }),
    });
    console.time("update vertices");
    const color = new Color();
    const colors: number[] = [];
    const { geometry } = mesh.current!;
    for (let index = 0; index < geometry.attributes.position.count; index++) {
      const value = vertexValues[index];
      geometry.attributes.position.setZ(index, value * scale);
      color.setHSL(0.05, 1, value);
      colors.push(color.r, color.g, color.b);
    }
    geometry.computeVertexNormals();
    geometry.attributes.color = new Float32BufferAttribute(colors, 3);
    geometry.attributes.color.needsUpdate = true;
    geometry.attributes.position.needsUpdate = true;
    console.timeEnd("update vertices");
  }, [inputArraySize, scale]);

  return (
    <>
      <directionalLight color={0xffffff} position={[-1, 1, 0]} />
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
