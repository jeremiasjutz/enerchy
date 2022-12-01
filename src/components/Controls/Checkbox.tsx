import clsx from "clsx";
import { useStore } from "../../store";
import { ProductionPlantCategory, productionPlantLabels } from "../../types";

import {
  ArrowDown,
  Atom,
  Droplet,
  GasTankDrop,
  Leaf,
  OilIndustry,
  SunLight,
  Trash,
  Wind,
} from "iconoir-react";
import { useRef } from "react";

interface CheckboxProps {
  labelKey: string;
  type: ProductionPlantCategory;
  amount?: number;
}
export function Checkbox({ labelKey, type, amount }: CheckboxProps) {
  const categories = useStore((state) => state.categories);
  const toggleCategory = useStore((state) => state.toggleCategory);
  const checked = categories.includes(type);
  const productionPlantLabel = productionPlantLabels[labelKey];
  const Icon = productionPlantIcons[labelKey];
  const devAmount = useRef(~~(Math.random() * 10000));

  return (
    <div>
      <input
        id={"category-checkbox-" + type}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={() => toggleCategory(type)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleCategory(type);
          }
        }}
      />
      <label
        htmlFor={"category-checkbox-" + type}
        className={clsx(
          "relative flex cursor-pointer items-center gap-3 rounded-xl px-4 py-4 ",
          "font-medium transition-all peer-focus-visible:ring-2 sm:text-xl",
          checked
            ? "bg-accent-900 text-accent ring-accent"
            : "bg-gray-900 text-gray-300 ring-gray-500"
        )}
      >
        <span
          className={clsx(
            "absolute top-0 right-2 -translate-y-1/2 rounded-full",
            "px-3 py-0.5 text-xs font-semibold transition-colors",
            checked ? "bg-accent-800" : "bg-gray-800"
          )}
        >
          {amount ?? devAmount.current}
        </span>
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        <span>{productionPlantLabel}</span>
      </label>
    </div>
  );
}

export const productionPlantIcons: Record<string, typeof Droplet> = {
  Water: Droplet,
  Solar: SunLight,
  Wind: Wind,
  Biomass: Leaf,
  Nuclear: Atom,
  Oil: OilIndustry,
  Gas: GasTankDrop,
  Waste: Trash,
};
