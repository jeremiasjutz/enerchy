import gsap, { Power3 } from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { OrbitControls, Text, useTexture } from "@react-three/drei";
import { Color, Float32BufferAttribute, Mesh, Vector3 } from "three";
import albertSansUrl from "@fontsource/albert-sans/files/albert-sans-all-700-normal.woff";

import { useStore } from "../store";
import { ASPECT_SWITZERLAND, BOUNDARIES, MAX_VALUE, SIZE } from "../constants";
import {
  generatePowerValueArray,
  generateHeatmapVertexValues,
} from "../heatmap";
import {
  linearInterpolation,
  logarithmicInterpolation,
} from "../utils/interpolations";

const duration = 1;
const ease = Power3.easeInOut;

const scale = 0.5;

const initialPosition = {
  x: 0.08554049516572004,
  y: -0.0324028957922643,
  z: 0.0018479313613449788,
};

export default function HeatMap({ isReady }: { isReady: boolean }) {
  const mesh = useRef<Mesh>(null);
  const markerRef = useRef<Mesh>(null);
  const textRef = useRef<Mesh>(null);
  const isFirstRender = useRef(false);
  const { camera } = useThree();
  const switzerlandCantonBorders = useTexture("/switzerlandCantonBorders.png");
  const switzerlandBorderAlphaMap = useTexture(
    "/switzerlandBorderAlphaMap.png"
  );
  const minPower = useStore((state) => state.minPower);
  const maxPower = useStore((state) => state.maxPower);
  const checkedCategories = useStore((state) => state.checkedCategories);
  const maxPowerOutput = useStore((state) => state.maxPowerOutput);

  useFrame(() => {
    textRef.current?.lookAt(camera.position);
  });

  useEffect(() => {
    if (isReady) {
      gsap.to(camera.position, {
        y: -0.5,
        z: 0.3,
        ease,
        duration: 3,
      });
    }
  }, [isReady]);

  useEffect(() => {
    const { geometry } = mesh.current!;
    const { attributes } = geometry;
    const { position } = attributes;

    const inputArraySize = SIZE / 2;

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

  useEffect(() => {
    if (maxPowerOutput.length && markerRef.current && textRef.current) {
      const x = linearInterpolation({
        number: maxPowerOutput[0],
        inputRange: [BOUNDARIES.east.min, BOUNDARIES.east.max],
        outputRange: [-0.5, 0.5],
      });
      const y = linearInterpolation({
        number: maxPowerOutput[1],
        inputRange: [BOUNDARIES.north.min, BOUNDARIES.north.max],
        outputRange: [-ASPECT_SWITZERLAND / 2, ASPECT_SWITZERLAND / 2],
      });
      const z = logarithmicInterpolation({
        number: maxPowerOutput[2],
        inputRange: [0, MAX_VALUE],
        outputRange: [0, scale],
      });

      gsap.to(markerRef.current.position, {
        x,
        y,
        z: z + 0.02,
        ease,
        duration,
      });
      gsap.to(textRef.current.position, {
        x,
        y,
        z: z + 0.04,
        ease,
        duration,
      });
    }
  }, [maxPowerOutput]);

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
      {maxPowerOutput.length && (
        <>
          <Suspense fallback={null}>
            <Text
              ref={textRef}
              position={[
                initialPosition.x,
                initialPosition.y,
                initialPosition.z + 0.04,
              ]}
              fontSize={0.0125}
              up={[0, 0, 1]}
              font={albertSansUrl}
              anchorX="center"
              anchorY="middle"
            >
              {maxPowerOutput[2].toLocaleString("de-CH")} kWh
            </Text>
          </Suspense>
          <mesh
            ref={markerRef}
            position={[
              initialPosition.x,
              initialPosition.y,
              initialPosition.z + 0.02,
            ]}
            rotation-x={Math.PI / 2}
          >
            <cylinderGeometry args={[0.005, 0, 0.01, 32]} />
            <meshStandardMaterial color="white" transparent opacity={0.8} />
          </mesh>
        </>
      )}
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
