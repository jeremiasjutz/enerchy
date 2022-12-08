import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";

import { PowerRangeRadioButtons } from "./PowerRangeRadioButtons";
import { Settings } from "./Settings";
import { Categories } from "./Categories";
import { ScaleSlider } from "./ScaleSlider";
import { ToggleControlsButton } from "./ToggleControlsButton";

export default function Controls() {
  const [isControlsOpen, setIsControlsOpen] = useState(true);

  return (
    <motion.aside
      initial={{ x: 0 }}
      animate={{ x: isControlsOpen ? 0 : "-100%" }}
      className={clsx(
        "fixed inset-y-0 z-20 w-full select-none border-gray-900 sm:w-auto",
        "bg-black/75 text-gray-800 backdrop-blur-md sm:border-r"
      )}
    >
      <ToggleControlsButton
        isControlsOpen={isControlsOpen}
        setIsControlsOpen={setIsControlsOpen}
      />
      <div className="bg-pattern-sidebar h-full overflow-y-auto p-6">
        <div className="relative grid gap-12">
          <PowerRangeRadioButtons />
          <Categories />
          <ScaleSlider />
          <Settings />
        </div>
      </div>
    </motion.aside>
  );
}
