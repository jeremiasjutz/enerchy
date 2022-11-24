import { Canvas } from "@react-three/fiber";
import { NavArrowDown } from "iconoir-react";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

import LoadingLogo from "./LoadingLogo";
import { pageTransition } from "./Content";
import { productionPlantLabels } from "../types";
import { useScrollToHeatMap } from "../hooks/useScrollToHeatMap";

const labelArray = Object.values(productionPlantLabels);

export default function Onboarding({
  scrollToHeatMap,
}: {
  scrollToHeatMap: () => void;
}) {
  const [contentVisible, setContentVisible] = useState(false);

  useScrollToHeatMap(scrollToHeatMap);

  return (
    <motion.div
      className="bg-pattern fixed inset-0 bg-black text-white/30"
      transition={pageTransition}
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
    >
      <Canvas
        className="!absolute inset-0 -translate-y-12 sm:translate-y-0"
        camera={{ fov: 55 }}
      >
        <LoadingLogo onComplete={() => setContentVisible(true)} />
      </Canvas>
      {contentVisible && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto grid h-full max-w-7xl grid-rows-3 place-items-center px-8 sm:text-center"
        >
          <div />
          <div className="grid place-items-center gap-10">
            <motion.h1
              variants={textVariant}
              className="w-full text-4xl font-extrabold tracking-tighter text-white sm:self-auto sm:text-5xl md:text-8xl"
            >
              Entdecke die unsichtbaren Berge der Schweiz
            </motion.h1>
            <motion.h2
              variants={textVariant}
              className="max-w-5xl text-lg text-gray-400 sm:text-2xl"
            >
              {`${labelArray.slice(0, -1).join(", ")} und ${Object.values(
                labelArray
              ).at(-1)}. `}
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
            className="mb-8 w-full self-end rounded-xl bg-accent/25 px-6 py-4 font-medium text-accent ring-2 ring-inset ring-accent backdrop-blur-sm sm:mb-0 sm:w-auto sm:self-auto sm:text-xl"
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
