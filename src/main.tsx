import React from "react";
import ReactDOM from "react-dom/client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("enerchy") as HTMLElement).render(
  <React.StrictMode>
    <Canvas>
      <OrbitControls />
      <ambientLight />
      <App />
    </Canvas>
  </React.StrictMode>
);
