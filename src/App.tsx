import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import HeatMap from "./components/HeatMap";
import Controls from "./components/Controls";

export default function App() {
  return (
    <>
      <Controls />
      <Canvas
        className="cursor-grabbing bg-black"
        camera={{
          position: [0, -1, 1],
          near: 0.001,
          up: [0, 0, 1],
        }}
      >
        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 - 0.25}
          minDistance={0.1}
          maxDistance={1}
          rotateSpeed={0.5}
        />
        <ambientLight />
        <HeatMap />
      </Canvas>
    </>
  );
}
