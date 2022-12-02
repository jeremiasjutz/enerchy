import { useStore } from "../store";
import { motion } from "framer-motion";
import { numberFormatter } from "../utils";
import clsx from "clsx";

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
    <div
      className="absolute top-0 right-0 z-10 w-full border-b border-gray-900  
    bg-black/75 bg-black p-4 py-6 pl-[26.5rem] pr-10 text-white/20 text-gray-300 backdrop-blur-md"
    >
      <div className="mb-2 text-sm">
        Leistung aller Kraftwerke:{" "}
        {numberFormatter.format(Math.round(totalCapacityOfAllCategories))}kWh
      </div>
      <div
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))" }}
        className="grid grid-cols-8 gap-4 text-gray-400"
      >
        {categories.map((category) => {
          return (
            <div
              className={clsx(
                "inline-block w-[100%] min-w-[100px]",
                !checkedCategories.includes(category.id) && "opacity-50"
              )}
            >
              <div className="mb-1 flex justify-between text-xs">
                <span>{category.label} </span>
                <span>
                  {Math.round(
                    (category.totalCapacity / totalCapacityOfAllCategories) *
                      100 *
                      10
                  ) /
                    10 +
                    "%"}
                </span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-md border border-gray-500">
                <motion.div
                  animate={{
                    width:
                      "calc(" +
                      (category.totalCapacity / totalCapacityOfAllCategories) *
                        100 +
                      "% + 1px)",
                  }}
                  transition={{ type: "spring", bounce: 0 }}
                  className={clsx(
                    "relative top-[-11px] left-[-1px] inline-block h-[110%] bg-gray-500",
                    !checkedCategories.includes(category.id) && ""
                  )}
                />
                {/* <div className="absolute top-[-1px] pl-1 text-center text-xs mix-blend-difference">
                  {Math.round(
                    (category.totalCapacity / totalCapacityOfAllCategories) *
                      100 *
                      10
                  ) /
                    10 +
                    "%"}
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="h-4 w-[calc(100%)] rounded-md border border-accent">
        <div className="relative top-[-4px] inline-block h-[100%] w-[50%] rounded-l-md border-r border-accent"></div>
        <div className="relative top-[-4px] inline-block h-[100%] w-[20%] border-r border-accent"></div>
        <div className="relative top-[-4px] inline-block h-[100%] w-[15%] border-r border-accent"></div>
        <div className="relative top-[-4px] inline-block h-[100%] w-[15%] rounded-r-md"></div>
      </div>

      <div className="grid grid-cols-8">
        <div className="inline-block text-xs">
          <div className=" mr-1 inline-block h-2 w-2 rounded-full bg-red-500" />
          Wasserkraft
        </div>

        <div className="inline-block text-xs">
          <div className=" mr-1 inline-block h-2 w-2 rounded-full bg-yellow-500" />
          Solarenergie
        </div>
      </div> */}
    </div>
  );
}
