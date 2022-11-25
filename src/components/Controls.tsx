import { useStore } from "../store";
import {
  RenewableProductionPlantCategories,
  ProductionPlantCategory,
  productionPlantLabels,
  NonRenewableProductionPlantCategories,
} from "../types";
import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";
import { motion, Transition } from "framer-motion";
import { ArrowLeft } from "iconoir-react";
import { pageTransition } from "./Content";

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

export default function Controls() {
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const minPower = useStore((state) => state.minPower);
  const maxPower = useStore((state) => state.maxPower);
  const setMinPower = useStore((state) => state.setMinPower);
  const setMaxPower = useStore((state) => state.setMaxPower);

  const [minPowerLocal, setMinPowerLocal] = useState(minPower);
  const [maxPowerLocal, setMaxPowerLocal] = useState(maxPower);

  function mapStepValueToPowerValue(stepValue: number) {
    switch (stepValue) {
      case 0:
        return 0;
      case 1:
        return 1000;
      case 2:
        return 5_000;
      case 3:
        return 10_000;
      case 4:
        return 50_000;
      case 5:
        return 100_000;
      case 6:
        return 500_000;
      case 7:
        return 1_000_000;
      case 8:
        return 2_000_000;
      default:
        return 0;
    }
  }

  function formatPower(powerValue: number) {
    return powerValue / 1000;
  }

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: isControlsOpen ? 0 : "-100%" }}
      transition={pageTransition}
      className="text-whism fixed inset-y-0 z-10 border-r border-gray-800 bg-gray-900 p-6"
    >
      <motion.button
        initial={{ x: 0 }}
        animate={{ x: isControlsOpen ? 0 : "100%" }}
        transition={pageTransition}
        className="absolute top-0 right-0 bg-white/10 p-2 backdrop-blur-md"
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
      <div className="mt-6 grid gap-2">
        <label>
          Megawattstunden
          <Slider.Root
            defaultValue={[0, 1]}
            max={8}
            step={1}
            onValueCommit={([min, max]) => {
              setMinPower(mapStepValueToPowerValue(min));
              setMaxPower(mapStepValueToPowerValue(max));
            }}
            onValueChange={([min, max]) => {
              setMinPowerLocal(mapStepValueToPowerValue(min));
              setMaxPowerLocal(mapStepValueToPowerValue(max));
            }}
            minStepsBetweenThumbs={1}
            aria-label="value"
            className="relative mb-7 flex h-5 w-64 touch-none items-center"
          >
            <Slider.Track className="relative h-0.5 w-full grow rounded-full bg-gray-800">
              <Slider.Range className="absolute h-full bg-accent" />
            </Slider.Track>
            <Slider.Thumb
              className={
                "block h-5 w-5 rounded-md border-2 border-accent bg-black focus:outline-none"
              }
            >
              <div className="absolute top-full -left-[10px] mt-1 w-[40px] text-center text-xs text-accent">
                {formatPower(minPowerLocal)}
              </div>
            </Slider.Thumb>
            <Slider.Thumb
              className={
                "block h-5 w-5 rounded-md border-2 border-accent bg-black focus:outline-none"
              }
            >
              <div className="absolute top-full -left-[10px] mt-1 w-[40px] text-center text-xs text-accent">
                {formatPower(maxPowerLocal)}
              </div>
            </Slider.Thumb>
          </Slider.Root>
        </label>

        <h2>Erneuerbar</h2>
        <div className="mb-2 grid grid-cols-2 gap-2">
          {renewableProductionPlantCategories.map(([labelKey, type]) => (
            <Checkbox labelKey={labelKey} type={type} key={labelKey} />
          ))}
        </div>

        <h2>Nicht erneuerbar</h2>
        <div className="grid grid-cols-2 gap-2">
          {nonRenewableProductionPlantCategories.map(([labelKey, type]) => (
            <Checkbox labelKey={labelKey} type={type} key={labelKey} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface CheckboxProps {
  labelKey: string;
  type: ProductionPlantCategory;
}
function Checkbox({ labelKey, type }: CheckboxProps) {
  const categories = useStore((state) => state.categories);
  const toggleCategory = useStore((state) => state.toggleCategory);

  return (
    <div>
      <input
        type="checkbox"
        id={"category-checkbox-" + type}
        className="peer hidden"
        checked={categories.includes(type)}
        onChange={() => toggleCategory(type)}
      />
      <label
        htmlFor={"category-checkbox-" + type}
        className="block cursor-pointer rounded-xl border border-gray-600 bg-white/10 px-3 py-2 font-semibold text-white/50 peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-accent"
      >
        {productionPlantLabels[labelKey]}
      </label>
    </div>
  );
}
