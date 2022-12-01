import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft } from "iconoir-react";

import { pageTransition } from "../Content";
import {
  RenewableProductionPlantCategories,
  ProductionPlantCategory,
  NonRenewableProductionPlantCategories,
} from "../../types";
import { Checkbox } from "./Checkbox";
import { PowerRangeRadioButtons } from "./PowerRangeRadioButtons";

export default function Controls() {
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  return (
    <motion.aside
      initial={{ x: 0 }}
      animate={{ x: isControlsOpen ? 0 : "-100%" }}
      transition={pageTransition}
      className={clsx(
        "fixed inset-y-0 z-10 w-full select-none sm:w-[30rem]",
        "border-gray-900 bg-black/75 text-white/20 backdrop-blur-md sm:border-r"
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
          "absolute top-0 right-0 border-gray-500 bg-gray-900",
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
      <div className="bg-pattern-sidebar absolute inset-0 -z-10 overflow-y-auto p-8">
        <div className="grid gap-12">
          <PowerRangeRadioButtons />
          <div>
            <h1 className="mb-4 text-3xl font-bold text-white">
              Kratfwerk Typ
            </h1>
            <h2 className="mb-2 text-lg font-medium text-white">
              Erneuerbare Energie
            </h2>
            <div className="mb-6 grid grid-cols-2 gap-x-3 gap-y-4">
              {renewableProductionPlantCategories.map(([labelKey, type]) => (
                <Checkbox labelKey={labelKey} type={type} key={labelKey} />
              ))}
            </div>
            <h2 className="mb-2 text-lg font-medium text-white">
              Nicht erneuerbare Energie
            </h2>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              {nonRenewableProductionPlantCategories.map(([labelKey, type]) => (
                <Checkbox labelKey={labelKey} type={type} key={labelKey} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

const lengthRenewable = Object.keys(RenewableProductionPlantCategories).length;
const lengthNonRenewable = Object.keys(
  NonRenewableProductionPlantCategories
).length;

const renewableProductionPlantCategories = Object.entries(
  RenewableProductionPlantCategories
).slice(lengthRenewable / 2, lengthRenewable) as unknown as [
  string,
  ProductionPlantCategory
][];

const nonRenewableProductionPlantCategories = Object.entries(
  NonRenewableProductionPlantCategories
).slice(lengthNonRenewable / 2, lengthNonRenewable) as unknown as [
  string,
  ProductionPlantCategory
][];
