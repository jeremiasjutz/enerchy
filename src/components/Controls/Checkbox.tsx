import clsx from "clsx";
import { useStore } from "../../store";
import { ProductionPlantCategory } from "../../types";

interface CheckboxProps {
  category: ProductionPlantCategory;
}
export function Checkbox({ category }: CheckboxProps) {
  const toggleCategory = useStore((state) => state.toggleCategory);
  const Icon = category.icon;

  return (
    <div>
      <input
        id={"category-checkbox-" + category.id}
        type="checkbox"
        className="peer sr-only"
        checked={category.isChecked}
        onChange={() => toggleCategory(category)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleCategory(category);
          }
        }}
      />
      <label
        htmlFor={"category-checkbox-" + category.id}
        className={clsx(
          "relative flex cursor-pointer items-center rounded-xl px-4 py-3 ",
          "font-medium transition-all peer-focus-visible:ring-2 sm:px-4",
          category.isChecked
            ? "bg-accent-900 text-accent ring-accent"
            : "bg-gray-900 text-gray-300 ring-gray-500"
        )}
      >
        <Icon className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />

        <span
          className={clsx(
            "absolute top-0 right-2 -translate-y-1/2 rounded-full",
            "px-3 py-0.5 text-xs font-semibold transition-colors",
            category.isChecked ? "bg-accent-800" : "bg-gray-800"
          )}
        >
          {category.currentAmount ?? ~~(Math.random() * 10000)}
        </span>
        <span>{category.label}</span>
      </label>
    </div>
  );
}
