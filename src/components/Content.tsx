import { Canvas } from "@react-three/fiber";
import HeatMap from "./HeatMap";
import Controls from "./Controls";
import Statistics from "./Statistics";
import { AnimatePresence, motion, Transition } from "framer-motion";
import { useRef, useState } from "react";
import { useStore } from "../store";

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
  const isStatisticsPanelOpen = useStore(
    (state) => state.isStatisticsPanelOpen
  );
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
      <AnimatePresence initial={false}>
        {isStatisticsPanelOpen && <Statistics />}
      </AnimatePresence>
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
