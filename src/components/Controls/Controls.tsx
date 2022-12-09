import { motion } from "framer-motion";
import { useState } from "react";

import { PowerRangeRadioButtons } from "./PowerRangeRadioButtons";
import { Settings } from "./Settings";
import { Categories } from "./Categories";
import { ScaleSlider } from "./ScaleSlider";
import { ToggleControlsButton } from "./ToggleControlsButton";
import { useMediaQuery } from "usehooks-ts";
import { useStore } from "../../store";

export default function Controls() {
  const isControlPanelOpen = useStore((state) => state.isControlPanelOpen);
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <motion.aside
      initial={isMobile ? { y: 0 } : { x: 0 }}
      animate={
        isMobile
          ? { y: isControlPanelOpen ? 0 : "100%" }
          : { x: isControlPanelOpen ? 0 : "-100%" }
      }
      className={
        "fixed bottom-0 z-20 h-1/2 w-full select-none rounded-t-xl bg-black text-gray-800 shadow-2xl ring-1 ring-gray-900 md:inset-y-0 md:h-full md:w-auto md:rounded-none md:border-r md:border-gray-900 md:ring-0"
      }
    >
      <ToggleControlsButton />
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
