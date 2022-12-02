import { motion } from "framer-motion";
import { Check } from "iconoir-react";

export function Checkbox({
  checked,
  onChange,
  label,
  htmlFor,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  htmlFor: string;
}) {
  return (
    <div className="text-white">
      <input
        type="checkbox"
        id={htmlFor}
        className="peer sr-only"
        checked={checked}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onChange();
          }
        }}
      />
      <label
        htmlFor={htmlFor}
        className="flex cursor-pointer items-center gap-2 peer-checked:[&>div]:bg-accent-900 peer-focus-visible:[&>div]:ring-2"
      >
        <div className="grid h-6 w-6 place-items-center rounded-md bg-gray-900 text-accent ring-accent transition-all">
          <motion.div
            animate={{
              scale: checked ? 1 : 0,
              opacity: checked ? 1 : 0,
            }}
          >
            <Check className="h-5 w-5" />
          </motion.div>
        </div>
        <span className="font-medium leading-none">{label}</span>
      </label>
    </div>
  );
}
