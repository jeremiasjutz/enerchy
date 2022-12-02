import gsap, { Power3 } from "gsap";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Color, Float32BufferAttribute, Mesh } from "three";

import { useStore } from "../store";
import { ASPECT_SWITZERLAND, MAX_VALUE, SIZE } from "../constants";
import {
  generatePowerValueArray,
  generateHeatmapVertexValues,
} from "../heatmap";

export default function HeatMap({ isReady }: { isReady: boolean }) {
  const mesh = useRef<Mesh>(null);
  const isFirstRender = useRef(false);
  const { camera } = useThree();
  const switzerlandCantonBorders = useTexture("/switzerlandCantonBorders.png");
  const switzerlandBorderAlphaMap = useTexture(
    "/switzerlandBorderAlphaMap.png"
  );
  const minPower = useStore((state) => state.minPower);
  const maxPower = useStore((state) => state.maxPower);
  const checkedCategories = useStore((state) => state.checkedCategories);

  useEffect(() => {
    if (isReady) {
      gsap.to(camera.position, {
        y: -0.5,
        z: 0.3,
        ease: Power3.easeInOut,
        duration: 3,
      });
    }
  }, [isReady]);

  useEffect(() => {
    const { geometry } = mesh.current!;
    const { attributes } = geometry;
    const { position } = attributes;

    const inputArraySize = SIZE / 2;
    const scale = 0.5;

    const { vertexValues, maxValueInSelection } = generateHeatmapVertexValues({
      array: generatePowerValueArray({
        inputArraySize,
        min: minPower,
        max: maxPower,
        checkedCategories,
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
      if (isFirstRender.current) {
        position.setZ(index, value * scale);
      } else {
        positions.push(
          position.getX(index),
          position.getY(index),
          value * scale
        );
      }

      color.setHSL(0.05, 1, (value * MAX_VALUE) / maxValueInSelection || 0);
      colors.push(color.r, color.g, color.b);
    }

    if (isFirstRender.current) {
      position.needsUpdate = true;
      geometry.computeVertexNormals();
      attributes.color = new Float32BufferAttribute(colors, 3);
      attributes.color.needsUpdate = true;
    } else {
      const duration = 1;
      const ease = Power3.easeInOut;
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
    }
  }, [minPower, maxPower, checkedCategories]);

  return (
    <>
      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2 - 0.25}
        minDistance={0.1}
        maxDistance={2}
      />
      <ambientLight />
      <pointLight color={0xffffff} position={[-3, 3, 0]} />
      <mesh position={[0, 0, -0.0005]}>
        <planeGeometry args={[1, ASPECT_SWITZERLAND, 1, 1]} />
        <meshBasicMaterial
          map={switzerlandCantonBorders}
          transparent
          opacity={0.5}
        />
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
          opacity={1}
          transparent
          alphaMap={switzerlandBorderAlphaMap}
        />
      </mesh>
    </>
  );
}
