import clsx from "clsx";
import { useStore } from "../../store";
import { ProductionPlantCategory } from "../../types";
import { numberFormatter } from "../../utils";

interface CategoryCheckboxProps {
  category: ProductionPlantCategory;
}
export function CategoryCheckbox({ category }: CategoryCheckboxProps) {
  const toggleCategory = useStore((state) => state.toggleCheckedCategory);
  const checkedCategories = useStore((state) => state.checkedCategories);
  const Icon = category.icon;
  const isChecked =
    checkedCategories.includes(category.id) && category.currentAmount > 0;
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
        className="relative flex cursor-pointer items-center rounded-xl bg-gray-900 px-4 py-3 font-medium text-gray-300 ring-gray-500 transition-all peer-checked:bg-accent-900 peer-checked:text-accent peer-checked:ring-accent peer-focus-visible:ring-2 peer-disabled:opacity-50 sm:px-4"
      >
        <Icon className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
        <span
          className={clsx(
            "absolute top-0.5 right-2 -translate-y-1/2 rounded-md",
            "px-2 py-px text-xs font-semibold transition-colors",
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
