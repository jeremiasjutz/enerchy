import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Enerchy from "./components/Enerchy";

export default function App() {
  return (
    <>
      <div>Hello</div>
      <Canvas
        camera={{
          position: [0, 0, 1],
          near: 0.001,
        }}
      >
        <OrbitControls />
        <ambientLight />
        <axesHelper />
        <Enerchy />
      </Canvas>
    </>
  );
}
