import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import HeatMap from "./components/HeatMap";
import Controls from "./components/Controls";
import { useState } from "react";

export default function App() {
  const [minPower, setMinPower] = useState<number>(0);
  const [maxPower, setMaxPower] = useState<number>(100);
  const [categoryWaterPowerEnabled, setCategoryWaterPowerEnabled] =
    useState<boolean>(false);
  const [categoryPhotovoltaicEnabled, setCategoryPhotovoltaicEnabled] =
    useState<boolean>(false);
  const [categoryWindEnergyEnabled, setCategoryWindEnergyEnabled] =
    useState<boolean>(false);
  const [categoryBiomassEnabled, setCategoryBiomassEnabled] =
    useState<boolean>(false);
  const [categoryOilEnabled, setCategoryOilEnabled] = useState<boolean>(false);
  const [categoryGasEnabled, setCategoryGasEnabled] = useState<boolean>(false);
  const [categoryWasteEnabled, setCategoryWasteEnabled] =
    useState<boolean>(false);
  const [categoryNuclearEnergyEnabled, setCategoryNuclearEnergyEnabled] =
    useState<boolean>(false);

  return (
    <>
      <Controls
        setMinPower={setMinPower}
        setMaxPower={setMaxPower}
        setCategoryWaterPowerEnabled={setCategoryWaterPowerEnabled}
        setCategoryPhotovoltaicEnabled={setCategoryPhotovoltaicEnabled}
        setCategoryWindEnergyEnabled={setCategoryWindEnergyEnabled}
        setCategoryBiomassEnabled={setCategoryBiomassEnabled}
        setCategoryOilEnabled={setCategoryOilEnabled}
        setCategoryGasEnabled={setCategoryGasEnabled}
        setCategoryWasteEnabled={setCategoryWasteEnabled}
        setCategoryNuclearEnergyEnabled={setCategoryNuclearEnergyEnabled}
      />

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
        <axesHelper />
        <HeatMap
          maxPower={maxPower}
          minPower={minPower}
          categoryWaterPowerEnabled={categoryWaterPowerEnabled}
          categoryPhotovoltaicEnabled={categoryPhotovoltaicEnabled}
          categoryWindEnergyEnabled={categoryWindEnergyEnabled}
          categoryBiomassEnabled={categoryBiomassEnabled}
          categoryOilEnabled={categoryOilEnabled}
          categoryGasEnabled={categoryGasEnabled}
          categoryWasteEnabled={categoryWasteEnabled}
          categoryNuclearEnergyEnabled={categoryNuclearEnergyEnabled}
        />
      </Canvas>
    </>
  );
}
