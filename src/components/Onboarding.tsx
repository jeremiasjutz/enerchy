import { Canvas } from "@react-three/fiber";
import { NavArrowDown } from "iconoir-react";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

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
      className={clsx(
        "fixed inset-0",
        "bg-black text-white/30",
        "bg-[size:calc(100vw/3)calc(100vw/3)] bg-[calc(100vw/6)calc(100vw/6)]",
        "sm:bg-[size:calc(100vw/5)calc(100vw/5)] sm:bg-[calc(100vw/10)calc(100vw/10)]",
        "md:bg-[size:calc(100vw/11)calc(100vw/11)] md:bg-[calc(100vw/22)calc(100vw/22)]",
        "before:absolute before:inset-0 before:-z-10 before:bg-[image:radial-gradient(transparent,black_70%)]"
      )}
      transition={pageTransition}
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      style={{
        backgroundImage:
          "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px), radial-gradient(transparent, black)",
      }}
    >
      <Canvas className="!absolute inset-0" camera={{ fov: 55 }}>
        <LoadingLogo onComplete={() => setContentVisible(true)} />
      </Canvas>
      {contentVisible && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-10 px-8 sm:text-center"
        >
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
            Die Schweizer Energieproduktion ist vielfältig. Finde heraus wo sich
            welche Kraftwerktypen befinden und wie viel Strom sie produzieren!
          </motion.h2>
          <motion.button
            variants={textVariant}
            onClick={scrollToHeatMap}
            className="group absolute bottom-8 grid place-items-center gap-2 text-accent sm:bottom-16 sm:gap-4 sm:text-xl"
          >
            <span className="transition-transform group-hover:translate-y-2">
              Berglandschaft entdecken
            </span>
            <NavArrowDown />
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
