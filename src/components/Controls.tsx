import { useStore } from "../store";
import {
  RenewableProductionPlantCategories,
  ProductionPlantCategories,
  productionPlantLabels,
  NonRenewableProductionPlantCategories,
} from "../types";
import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";

const lengthRenewable = Object.keys(RenewableProductionPlantCategories).length;
const lengthNonRenewable = Object.keys(
  NonRenewableProductionPlantCategories
).length;

const renewableProductionPlantCategories = Object.entries(
  RenewableProductionPlantCategories
).slice(lengthRenewable / 2, lengthRenewable) as unknown as [
  string,
  ProductionPlantCategories
][];

const nonRenewableProductionPlantCategories = Object.entries(
  NonRenewableProductionPlantCategories
).slice(lengthNonRenewable / 2, lengthNonRenewable) as unknown as [
  string,
  ProductionPlantCategories
][];

console.log(renewableProductionPlantCategories);

export default function Controls() {
  const minPower = useStore((state) => state.minPower);
  const maxPower = useStore((state) => state.maxPower);
  const categories = useStore((state) => state.categories);
  const setMinPower = useStore((state) => state.setMinPower);
  const setMaxPower = useStore((state) => state.setMaxPower);
  const toggleCategory = useStore((state) => state.toggleCategory);

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
    <div className="fixed top-10 left-10 z-10 rounded-md bg-black/30 p-4 text-white backdrop-blur-lg">
      <div className="grid gap-2">
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

        <div className=" mb-2 grid grid-cols-2 gap-2">
          {renewableProductionPlantCategories.map(([labelKey, type]) => (
            <div key={labelKey}>
              <input
                type="checkbox"
                id={"category-checkbox-" + type}
                className="peer hidden"
                checked={categories.includes(type)}
                onChange={() => toggleCategory(type)}
              />
              <label
                htmlFor={"category-checkbox-" + type}
                className="block cursor-pointer rounded-xl border  border-gray-600 bg-foreground/10 px-3 py-2 font-semibold text-foreground/50 peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-accent"
              >
                {productionPlantLabels[labelKey]}
              </label>
            </div>
          ))}
        </div>

        <h2>Nicht erneuerbar</h2>

        <div className=" grid grid-cols-2 gap-2">
          {nonRenewableProductionPlantCategories.map(([labelKey, type]) => (
            <div key={labelKey}>
              <input
                type="checkbox"
                id={"category-checkbox-" + type}
                className="peer hidden"
                checked={categories.includes(type)}
                onChange={() => toggleCategory(type)}
              />
              <label
                htmlFor={"category-checkbox-" + type}
                className="block cursor-pointer rounded-xl border  border-gray-600 bg-foreground/10 px-3 py-2 font-semibold text-foreground/50 peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-accent"
              >
                {productionPlantLabels[labelKey]}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
