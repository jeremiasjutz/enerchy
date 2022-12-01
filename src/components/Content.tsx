import { Canvas } from "@react-three/fiber";
import HeatMap from "./HeatMap";
import Controls from "./Controls";
import Statistics from "./Statistics";
import { motion, Transition } from "framer-motion";

export const pageTransition: Transition = {
  type: "spring",
  bounce: 0,
};

export default function Content({
  y,
  opacity,
}: {
  y: string | number;
  opacity: number;
}) {
  return (
    <motion.div
      id="content"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y, opacity }}
      transition={pageTransition}
      className="fixed inset-0"
    >
      <Controls />
      <Statistics />
      <Canvas
        className="bg-black"
        camera={{
          position: [0, -1, 1],
          near: 0.001,
          up: [0, 0, 1],
        }}
      >
        <HeatMap />
      </Canvas>
    </motion.div>
  );
}
