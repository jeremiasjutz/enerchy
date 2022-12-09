import clsx from "clsx";
import { motion } from "framer-motion";
import { ArrowDown, ArrowLeft } from "iconoir-react";
import { pageTransition } from "../Content";
import { useStore } from "../../store";
import { useMediaQuery } from "usehooks-ts";

export function ToggleControlsButton() {
  const isControlPanelOpen = useStore((state) => state.isControlPanelOpen);
  const toggleControlPanel = useStore((state) => state.toggleControlPanel);
  const isMobile = useMediaQuery("(max-width: 767px)");
  return (
    <motion.button
      initial={
        isMobile
          ? {}
          : {
              x: 0,
              borderBottomLeftRadius: "0.75rem",
              borderBottomRightRadius: 0,
            }
      }
      animate={
        isMobile
          ? {}
          : {
              x: isControlPanelOpen ? 0 : "100%",
              borderBottomLeftRadius: isControlPanelOpen ? "0.75rem" : 0,
              borderBottomRightRadius: isControlPanelOpen ? 0 : "0.75rem",
            }
      }
      transition={pageTransition}
      className={clsx(
        "absolute right-2 -top-14 z-10 rounded-xl border-gray-500 bg-gray-900 p-3 text-white focus:outline-none md:right-0 md:top-0 md:rounded-none md:focus-visible:border-b-2",
        isControlPanelOpen
          ? "md:focus-visible:border-l-2"
          : "md:focus-visible:border-r-2"
      )}
      onClick={toggleControlPanel}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: isControlPanelOpen ? 0 : 180 }}
        transition={{ ...pageTransition, delay: 0.25 }}
      >
        {isMobile ? <ArrowDown /> : <ArrowLeft />}
      </motion.div>
    </motion.button>
  );
}
