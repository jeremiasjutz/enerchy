import { useStore } from "../store";
import { motion } from "framer-motion";
import { numberFormatter } from "../utils";
import clsx from "clsx";

export default function Statistics() {
  const categories = useStore((state) => state.categories);
  const checkedCategories = useStore((state) => state.checkedCategories);
  const totalCapacityOfAllCategories = categories.reduce(
    (prev, cur) =>
      checkedCategories.includes(cur.id) ? prev + cur.totalCapacity : prev,
    0
  );

  return (
    <motion.aside
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      className="absolute inset-x-0 top-0 z-10 grid gap-4 border-b border-gray-900 bg-black/75 p-6 text-white backdrop-blur-md md:pr-10 md:pl-[26.5rem]"
    >
      <div>
        <h1 className="leadin text-lg font-bold">
          {numberFormatter.format(Math.round(totalCapacityOfAllCategories))} kWh
          <span className="block text-sm font-normal leading-none text-gray-300 md:ml-2 md:inline">
            Leistung der ausgewählten Kraftwerke
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-x-3 gap-y-2 text-gray-400 md:gap-4">
        {categories.map((category) => {
          const percentage =
            category.totalCapacity / totalCapacityOfAllCategories || 0;
          return (
            <div
              key={category.id}
              className={clsx(
                "transition-opacity",
                !checkedCategories.includes(category.id) ||
                  category.currentAmount === 0
                  ? "opacity-40 grayscale"
                  : ""
              )}
            >
              <div className="mb-0.5 flex justify-between text-xs">
                <span>{category.label}</span>
                <span>
                  {percentage.toLocaleString("de-CH", {
                    style: "percent",
                    maximumFractionDigits: 1,
                  })}
                </span>
              </div>
              <div className="flex h-2 overflow-hidden rounded-full bg-accent-900">
                <motion.div
                  animate={{
                    width: percentage * 100 + "%",
                  }}
                  transition={{
                    delay: 0.25,
                    duration: 1,
                    type: "spring",
                  }}
                  className="max-w-full rounded-full bg-accent"
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.aside>
  );
}
