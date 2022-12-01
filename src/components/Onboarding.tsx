import { Canvas } from "@react-three/fiber";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

import LoadingLogo from "./LoadingLogo";
import { pageTransition } from "./Content";
import { useScrollToHeatMap } from "../hooks/useScrollToHeatMap";
import { useStore } from "../store";

export default function Onboarding({
  scrollToHeatMap,
}: {
  scrollToHeatMap: () => void;
}) {
  const [contentVisible, setContentVisible] = useState(false);
  const categories = useStore((state) => state.categories);

  useScrollToHeatMap(scrollToHeatMap);

  return (
    <motion.div
      id="onboarding"
      className="bg-pattern fixed inset-0 bg-black text-white/30"
      transition={pageTransition}
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
    >
      <Canvas
        className="!pointer-events-none !absolute inset-0 -translate-y-12 sm:translate-y-0"
        camera={{ fov: 55 }}
      >
        <LoadingLogo onComplete={() => setContentVisible(true)} />
      </Canvas>
      {contentVisible && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto grid h-full max-w-7xl grid-rows-3 place-items-center p-8 sm:text-center"
        >
          <div />
          <div className="grid max-w-4xl place-items-center gap-10">
            <motion.h1
              variants={textVariant}
              className="w-full text-4xl font-extrabold tracking-[-0.035em] text-white sm:self-auto sm:text-5xl md:text-7xl"
            >
              Entdecke die unsichtbaren Berge der Schweiz
            </motion.h1>
            <motion.h2
              variants={textVariant}
              className="text-lg text-gray-400 sm:text-xl"
            >
              {`${categories
                .slice(0, -1)
                .map((cat) => cat.label)
                .join(", ")} und
              ${Object.values(categories).at(-1)?.label}. `}
              Die Schweizer Energieproduktion ist vielfältig. Finde heraus wo
              sich welche Kraftwerktypen befinden und wie viel Strom sie
              produzieren!
            </motion.h2>
          </div>
          <motion.button
            variants={textVariant}
            onClick={scrollToHeatMap}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="w-full self-end rounded-xl bg-accent-900 px-6 py-4 font-medium text-accent sm:mb-0 sm:w-auto sm:self-auto sm:text-xl"
          >
            Berglandschaft entdecken
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

const container: Variants = {
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const textVariant: Variants = {
  hidden: {
    opacity: 0,
    y: -75,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 2,
    },
  },
};
