import gsap from "gsap";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
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

  const { opacity, isMapVisible } = useControls({
    opacity: 0.9,
    isMapVisible: true,
  });

  useEffect(() => {
    const { geometry } = mesh.current!;
    const { attributes } = geometry;
    const { position } = attributes;

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
      color.setHSL(0.05, 1, value * 0.7);
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
