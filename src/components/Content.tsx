import { Canvas } from "@react-three/fiber";
import HeatMap from "./HeatMap";
import Controls from "./Controls";
import Statistics from "./Statistics";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useStore } from "../store";
import { Cancel } from "iconoir-react";
import { Reports } from "iconoir-react";
import { useMediaQuery } from "usehooks-ts";

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
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isControlPanelOpen = useStore((state) => state.isControlPanelOpen);
  const isStatisticsPanelOpen = useStore(
    (state) => state.isStatisticsPanelOpen
  );

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
      className="fixed inset-0"
    >
      <Controls />

      <AnimatePresence initial={false}>
        {isStatisticsPanelOpen && <Statistics />}
      </AnimatePresence>

      <ToggleStatisticsButton />
      <motion.div
        className="fixed inset-0"
        initial={{ y: isMobile ? "-25%" : 0, x: isMobile ? 0 : "10%" }}
        animate={
          isMobile
            ? { y: isControlPanelOpen ? "-25%" : 0 }
            : { x: isControlPanelOpen ? "10%" : 0 }
        }
      >
        <Canvas
          camera={{
            position: [0, 0, 3],
            near: 0.001,
            up: [0, 0, 1],
          }}
        >
          <HeatMap isReady={isReady} />
        </Canvas>
      </motion.div>
    </motion.div>
  );
}

function ToggleStatisticsButton() {
  const isStatisticsPanelOpen = useStore(
    (state) => state.isStatisticsPanelOpen
  );
  const toggleStatisticsPanel = useStore(
    (state) => state.toggleStatisticsPanel
  );

  return (
    <button
      id="toggleStatisticsPanelButton"
      className={
        "fixed top-2 right-2 z-10 rounded-xl border-gray-500 bg-gray-900 p-3 text-white focus:outline-none md:top-0 md:right-0 md:rounded-none md:rounded-bl-xl"
      }
      onClick={toggleStatisticsPanel}
    >
      <div>{isStatisticsPanelOpen ? <Cancel /> : <Reports />}</div>
    </button>
  );
}
