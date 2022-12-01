import { Canvas } from "@react-three/fiber";
import HeatMap from "./HeatMap";
import Controls from "./Controls";
import { motion, Transition } from "framer-motion";
import { useRef, useState } from "react";

export const pageTransition: Transition = {
  type: "spring",
  bounce: 0,
};

interface ContentProps {
  y: string | number;
  opacity: number;
  hasSeenOnboarding: boolean;
}

export default function Content({
  y,
  opacity,
  hasSeenOnboarding,
}: ContentProps) {
  const [isReady, setIsReady] = useState(hasSeenOnboarding);
  const isFirstAnimationPass = useRef(true);
  return (
    <motion.div
      id="content"
      initial={!hasSeenOnboarding && { y: "100%", opacity: 0 }}
      animate={!hasSeenOnboarding && { y, opacity }}
      onAnimationComplete={() => {
        if (isFirstAnimationPass.current) {
          isFirstAnimationPass.current = false;
        } else {
          setIsReady(true);
        }
      }}
      transition={pageTransition}
      className="fixed inset-0"
    >
      <Controls />
      <Canvas
        className="bg-black"
        camera={{
          position: [0, 0, 3],
          near: 0.001,
          up: [0, 0, 1],
        }}
      >
        <HeatMap isReady={isReady} />
      </Canvas>
    </motion.div>
  );
}
