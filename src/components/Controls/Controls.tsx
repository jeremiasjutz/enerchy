import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft } from "iconoir-react";

import { pageTransition } from "../Content";
import { Checkbox } from "./Checkbox";
import { PowerRangeRadioButtons } from "./PowerRangeRadioButtons";
import { useStore } from "../../store";

export default function Controls() {
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const categories = useStore((state) => state.categories);

  return (
    <motion.aside
      initial={{ x: 0 }}
      animate={{ x: isControlsOpen ? 0 : "-100%" }}
      transition={pageTransition}
      className={clsx(
        "fixed inset-y-0 z-20 w-full select-none border-gray-900 sm:w-auto",
        "bg-black/75 text-white/20 backdrop-blur-md sm:border-r"
      )}
    >
      <motion.button
        initial={{
          x: 0,
          borderBottomLeftRadius: "0.75rem",
          borderBottomRightRadius: 0,
        }}
        animate={{
          x: isControlsOpen ? 0 : "100%",
          borderBottomLeftRadius: isControlsOpen ? "0.75rem" : 0,
          borderBottomRightRadius: isControlsOpen ? 0 : "0.75rem",
        }}
        transition={pageTransition}
        className={clsx(
          "absolute top-0 right-0 z-10 border-gray-500 bg-gray-900",
          "p-4 text-white focus:outline-none focus-visible:border-b-2",
          isControlsOpen
            ? "focus-visible:border-l-2"
            : "focus-visible:border-r-2"
        )}
        onClick={() => setIsControlsOpen(!isControlsOpen)}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isControlsOpen ? 0 : 180 }}
          transition={{ ...pageTransition, delay: 0.25 }}
        >
          <ArrowLeft />
        </motion.div>
      </motion.button>
      <div className="bg-pattern-sidebar h-full overflow-y-auto p-6">
        <div className="relative grid gap-12">
          <PowerRangeRadioButtons />
          <div>
            <h1 className="mb-4 text-xl font-bold text-white">Kraftwerk Typ</h1>
            <h2 className="text-md mb-3 font-medium text-white">
              Erneuerbare Energie
            </h2>
            <div className="mb-6 grid grid-cols-2 gap-x-3 gap-y-4 text-sm">
              {categories.map((category) => {
                if (category.isRenewableEnergy) {
                  return <Checkbox key={category.id} category={category} />;
                }
              })}
            </div>
            <h2 className="text-md mb-3 font-medium text-white">
              Nicht erneuerbare Energie
            </h2>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 text-sm">
              {categories.map((category) => {
                if (!category.isRenewableEnergy) {
                  return <Checkbox key={category.id} category={category} />;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
