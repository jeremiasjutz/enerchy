import clsx from "clsx";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { ArrowLeft } from "iconoir-react";
import { pageTransition } from "../Content";

interface ToggleControlsButtonProps {
  isControlsOpen: boolean;
  setIsControlsOpen: Dispatch<SetStateAction<boolean>>;
}
export function ToggleControlsButton({
  isControlsOpen,
  setIsControlsOpen,
}: ToggleControlsButtonProps) {
  return (
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
        isControlsOpen ? "focus-visible:border-l-2" : "focus-visible:border-r-2"
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
  );
}
