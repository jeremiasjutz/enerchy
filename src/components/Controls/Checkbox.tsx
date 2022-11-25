import clsx from "clsx";
import { useStore } from "../../store";
import { ProductionPlantCategory, productionPlantLabels } from "../../types";

interface CheckboxProps {
  labelKey: string;
  type: ProductionPlantCategory;
  amount?: number;
}
export function Checkbox({ labelKey, type, amount }: CheckboxProps) {
  const categories = useStore((state) => state.categories);
  const toggleCategory = useStore((state) => state.toggleCategory);
  const checked = categories.includes(type);

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
          "relative block cursor-pointer rounded-xl px-4 py-4 font-medium sm:px-6 sm:text-xl",
          "transition-all peer-focus-visible:ring-2",
          checked
            ? "bg-accent-900 text-accent ring-accent"
            : "bg-gray-900 text-gray-300 ring-gray-500"
        )}
      >
        <span
          className={clsx(
            "absolute top-px right-2 -translate-y-1/2 rounded-xl",
            "px-3 py-0.5 text-xs font-semibold transition-colors",
            checked ? "bg-accent-800" : "bg-gray-800"
          )}
        >
          {amount ?? 0}
        </span>
        {productionPlantLabels[labelKey]}
      </label>
    </div>
  );
}
