import clsx from "clsx";
import { useStore } from "../../store";
import { ProductionPlantCategory } from "../../types";
import { numberFormatter } from "../../utils";

interface CheckboxProps {
  category: ProductionPlantCategory;
}
export function Checkbox({ category }: CheckboxProps) {
  const toggleCategory = useStore((state) => state.toggleCheckedCategory);
  const checkedCategories = useStore((state) => state.checkedCategories);
  const Icon = category.icon;
  const isChecked = checkedCategories.includes(category.id);
  const isDisabled = category.currentAmount === 0;

  return (
    <div>
      <input
        id={"category-checkbox-" + category.id}
        type="checkbox"
        className="peer sr-only"
        checked={isChecked}
        disabled={isDisabled}
        onChange={() => toggleCategory(category.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleCategory(category.id);
          }
        }}
      />
      <label
        htmlFor={"category-checkbox-" + category.id}
        className={clsx(
          "relative flex cursor-pointer items-center rounded-xl px-4 py-3 ",
          "font-medium transition-all peer-focus-visible:ring-2 sm:px-4",
          isChecked
            ? "bg-accent-900 text-accent ring-accent"
            : "bg-gray-900 text-gray-300 ring-gray-500",
          isDisabled && "opacity-50"
        )}
      >
        <Icon className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />

        <span
          className={clsx(
            "absolute top-0 right-2 -translate-y-1/2 rounded-full",
            "px-3 py-0.5 text-xs font-semibold transition-colors",
            isChecked ? "bg-accent-800" : "bg-gray-800"
          )}
        >
          {numberFormatter.format(category.currentAmount)}
        </span>
        <span>{category.label}</span>
      </label>
    </div>
  );
}
