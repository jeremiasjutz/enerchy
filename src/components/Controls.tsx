import { useStore } from "../store";
import { ProductionPlantCategories, productionPlantLabels } from "../types";

const length = Object.keys(ProductionPlantCategories).length / 2;
const inputs = Object.entries(ProductionPlantCategories).slice(length, -1) as [
  string,
  ProductionPlantCategories
][];

export default function Controls() {
  console.log();

  const minPower = useStore((state) => state.minPower);
  const maxPower = useStore((state) => state.maxPower);
  const categories = useStore((state) => state.categories);
  const setMinPower = useStore((state) => state.setMinPower);
  const setMaxPower = useStore((state) => state.setMaxPower);
  const toggleCategory = useStore((state) => state.toggleCategory);

  return (
    <div className="fixed top-10 left-10 z-10 text-white">
      <div className="grid gap-2">
        <label className="flex items-center gap-2">
          min power
          <input
            type="range"
            value={minPower}
            min="1"
            max="1872000"
            onChange={(e) => setMinPower(Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2">
          max power
          <input
            type="range"
            value={maxPower}
            min="1"
            max="1872000"
            onChange={(e) => setMaxPower(Number(e.target.value))}
          />
        </label>
        {inputs.map(([labelKey, type]) => (
          <label key={labelKey} className="flex items-center gap-2">
            {productionPlantLabels[labelKey]}
            <input
              type="checkbox"
              checked={categories.includes(type)}
              onChange={() => toggleCategory(type)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
