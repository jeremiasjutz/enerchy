import { CategoryCheckbox } from "./CategoryCheckbox";
import { useStore } from "../../store";

export function Categories() {
  const categories = useStore((state) => state.categories);
  const setAllCheckedCategories = useStore(
    (state) => state.setAllCheckedCategories
  );
  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-white">Kraftwerk Typ</h1>
      <div className="mb-3 flex items-center justify-between font-medium">
        <h2 className="text-md text-white">Erneuerbare Energie</h2>
        <button
          className="rounded-lg px-2 py-1 text-xs text-gray-400 ring-gray-500 transition-shadow focus:outline-none focus-visible:ring-2"
          onClick={() => setAllCheckedCategories("renewable")}
        >
          Alle auswählen
        </button>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
        {categories.map((category) => {
          if (category.isRenewableEnergy) {
            return <CategoryCheckbox key={category.id} category={category} />;
          }
        })}
      </div>
      <div className="mb-3 flex items-center justify-between font-medium">
        <h2 className="text-md text-white">Nicht erneuerbare Energie</h2>
        <button
          className="rounded-lg px-2 py-1 text-xs text-gray-400 ring-gray-500 transition-shadow focus:outline-none focus-visible:ring-2"
          onClick={() => setAllCheckedCategories("nonrenewable")}
        >
          Alle auswählen
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        {categories.map((category) => {
          if (!category.isRenewableEnergy) {
            return <CategoryCheckbox key={category.id} category={category} />;
          }
        })}
      </div>
    </div>
  );
}
