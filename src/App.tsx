import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Enerchy from "./components/Enerchy";

export default function App() {
  return (
    <>
      <Canvas
        className="bg-black"
        camera={{
          position: [0, -1, 1],
          near: 0.001,
        }}
      >
        <OrbitControls
          minPolarAngle={0.25}
          maxPolarAngle={Math.PI - 0.25}
          minAzimuthAngle={-Math.PI / 2.5}
          maxAzimuthAngle={Math.PI / 2.5}
          minDistance={0.1}
          maxDistance={1}
        />
        <ambientLight />
        {/* <axesHelper /> */}
        <Enerchy />
      </Canvas>
    </>
  );
}
