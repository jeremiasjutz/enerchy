import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check } from "iconoir-react";

import { pageTransition } from "../Content";
import { Checkbox } from "./Checkbox";
import { PowerRangeRadioButtons } from "./PowerRangeRadioButtons";
import { useStore } from "../../store";

export default function Controls() {
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const isStatisticsPanelOpen = useStore(
    (state) => state.isStatisticsPanelOpen
  );
  const toggleStatisticsPanel = useStore(
    (state) => state.toggleStatisticsPanel
  );
  const categories = useStore((state) => state.categories);
  const setAllCheckedCategories = useStore(
    (state) => state.setAllCheckedCategories
  );

  return (
    <motion.aside
      initial={{ x: 0 }}
      animate={{ x: isControlsOpen ? 0 : "-100%" }}
      className={clsx(
        "fixed inset-y-0 z-20 w-full select-none border-gray-900 sm:w-auto",
        "bg-black/75 text-white/20 backdrop-blur-md sm:border-r"
      )}
    >
      <motion.button
        initial={{
          x: 0,
          borderBottomLeftRadius: "0.75rem",
          borderBottomRightRadius: 0,
        }}
        animate={{
          x: isControlsOpen ? 0 : "100%",
          borderBottomLeftRadius: isControlsOpen ? "0.75rem" : 0,
          borderBottomRightRadius: isControlsOpen ? 0 : "0.75rem",
        }}
        transition={pageTransition}
        className={clsx(
          "absolute top-0 right-0 z-10 border-gray-500 bg-gray-900",
          "p-3 text-white focus:outline-none focus-visible:border-b-2",
          isControlsOpen
            ? "focus-visible:border-l-2"
            : "focus-visible:border-r-2"
        )}
        onClick={() => setIsControlsOpen(!isControlsOpen)}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isControlsOpen ? 0 : 180 }}
          transition={{ ...pageTransition, delay: 0.25 }}
        >
          <ArrowLeft />
        </motion.div>
      </motion.button>
      <div className="bg-pattern-sidebar h-full overflow-y-auto p-6">
        <div className="relative grid gap-12">
          <PowerRangeRadioButtons />
          <div>
            <h1 className="mb-4 text-xl font-bold text-white">Kraftwerk Typ</h1>
            <div className="mb-4 flex items-center justify-between font-medium">
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
                  return <Checkbox key={category.id} category={category} />;
                }
              })}
            </div>
            <div className="mb-4 flex items-center justify-between font-medium">
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
                  return <Checkbox key={category.id} category={category} />;
                }
              })}
            </div>
          </div>
          <div className="text-white">
            <input
              type="checkbox"
              id="toggleStatisticsPanel"
              className="peer sr-only"
              checked={isStatisticsPanelOpen}
              onChange={toggleStatisticsPanel}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  toggleStatisticsPanel();
                }
              }}
            />
            <label
              htmlFor="toggleStatisticsPanel"
              className="flex cursor-pointer gap-2 peer-focus-visible:[&>*]:ring-2 "
            >
              <div className="grid h-6 w-6 place-items-center rounded-md bg-accent-900 text-accent ring-accent">
                <motion.div
                  animate={{
                    scale: isStatisticsPanelOpen ? 1 : 0,
                    opacity: isStatisticsPanelOpen ? 1 : 0,
                  }}
                >
                  <Check className="h-5 w-5" />
                </motion.div>
              </div>
              <span className="font-medium">Statistik sichtbar</span>
            </label>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
