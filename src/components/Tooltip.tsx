import { useState } from "react";
import { InfoEmpty } from "iconoir-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  useFloating,
  useHover,
  useFocus,
  useInteractions,
} from "@floating-ui/react-dom-interactions";

export function Tooltip({ content }: { content: string }) {
  const [open, setOpen] = useState(false);
  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
  });
  const hover = useHover(context);
  const focus = useFocus(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
  ]);

  return (
    <>
      <button
        className="rounded-full ring-accent ring-offset-1 ring-offset-black focus:outline-none focus-visible:ring-2"
        ref={reference}
        {...getReferenceProps()}
      >
        <InfoEmpty className="h-5 w-5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            className="mt-2 max-w-[75%] rounded-xl bg-gray-800 p-3 px-4 text-sm shadow-xl"
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: "max-content",
            }}
            {...getFloatingProps()}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
