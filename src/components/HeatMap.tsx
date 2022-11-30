import gsap from "gsap";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Color, Float32BufferAttribute, Mesh } from "three";

import { useStore } from "../store";
import { linearInterpolation } from "../utils/interpolations";
import { ASPECT_SWITZERLAND, SIZE } from "../constants";
import {
  generatePowerValueArray,
  generateHeatmapVertexValues,
} from "../heatmap";

export default function HeatMap() {
  const mesh = useRef<Mesh>(null);
  const switzerlandTexture = useTexture("/switzerland-outline.png");
  const minPower = useStore((state) => state.minPower);
  const maxPower = useStore((state) => state.maxPower);
  const categories = useStore((state) => state.categories);

  useEffect(() => {
    const { geometry } = mesh.current!;
    const { attributes } = geometry;
    const { position } = attributes;

    // const inputArraySize =
    //   maxPower < 100_000 ? 100 : maxPower < 1_000_000 ? 50 : 25;

    const inputArraySize = 250;

    // const scale = linearInterpolation({
    //   number: maxPower,
    //   inputRange: [0, 1_872_000],
    //   outputRange: [1 / 20, 1 / 5],
    // });

    const scale = 0.5;

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
    const positions: number[] = [];

    if (!attributes.color) {
      attributes.color = new Float32BufferAttribute(
        new Array(position.count * 3).fill(0),
        3
      );
    }

    for (let index = 0; index < position.count; index++) {
      const value = vertexValues[index];

      positions.push(position.getX(index), position.getY(index), value * scale);
      // color.setHSL(value, 1, value * 0.7);

      // color.setHSL(value, 1, 0.02 + value * 0.7);

      if (value > 0 && value < 0.018) {
        color.setHSL(0.5, 1, value * 500);
      } else {
        color.setHSL(0.05, 1, value * 1.5);
      }

      colors.push(color.r, color.g, color.b);
    }

    const duration = 1;
    const ease = "power3";
    gsap.to(position.array, {
      ease,
      duration,
      endArray: positions,
      onUpdate: () => {
        position.needsUpdate = true;
        geometry.computeVertexNormals();
      },
    });
    gsap.to(attributes.color.array, {
      ease,
      duration,
      endArray: colors,
      onUpdate: () => {
        attributes.color.needsUpdate = true;
      },
    });
  }, [minPower, maxPower, categories]);

  return (
    <>
      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2 - 0.25}
        minDistance={0.1}
        maxDistance={1}
      />
      <ambientLight />
      <pointLight color={0xffffff} position={[-3, 3, 0]} />
      <mesh position={[0, 0, -0.001]}>
        <planeGeometry args={[1, ASPECT_SWITZERLAND, 1, 1]} />
        <meshBasicMaterial map={switzerlandTexture} />
      </mesh>
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
          opacity={0.85}
          transparent
        />
      </mesh>
    </>
  );
}
