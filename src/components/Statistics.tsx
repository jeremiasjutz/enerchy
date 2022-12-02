import { useStore } from "../store";
import { motion } from "framer-motion";
import { numberFormatter } from "../utils";

export default function Statistics() {
  const categories = useStore((state) => state.categories);
  const checkedCategories = useStore((state) => state.checkedCategories);
  const totalCapacityOfAllCategories = categories.reduce(
    (prev, current) =>
      checkedCategories.includes(current.id)
        ? prev + current.totalCapacity
        : prev,
    0
  );

  return (
    <aside className="absolute top-0 right-0 z-10 grid w-full gap-3 border-b border-gray-900 bg-black/75 p-4 py-6 pl-[26.5rem] pr-10 text-white backdrop-blur-md">
      <div>
        <h1 className="leadin text-lg font-bold">
          {numberFormatter.format(Math.round(totalCapacityOfAllCategories))} kWh
          <span className="ml-2 text-sm font-normal leading-none text-gray-300">
            Leistung der ausgewählten Kraftwerke
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 text-gray-400">
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className={
                !checkedCategories.includes(category.id) ? "opacity-50" : ""
              }
            >
              <div className="mb-1 flex justify-between text-xs">
                <span>{category.label} </span>
                <span>
                  {Math.round(
                    (category.totalCapacity / totalCapacityOfAllCategories ||
                      0) * 1000
                  ) /
                    10 +
                    "%"}
                </span>
              </div>
              <div className="flex h-2 overflow-hidden rounded-full bg-accent-900">
                <motion.div
                  animate={{
                    width:
                      (category.totalCapacity / totalCapacityOfAllCategories ||
                        0) *
                        100 +
                      "%",
                  }}
                  className="rounded-full bg-accent"
                />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
