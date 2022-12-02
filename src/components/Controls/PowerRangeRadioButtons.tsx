import clsx from "clsx";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

import { useStore } from "../../store";
import { Tooltip } from "../Tooltip";

export function PowerRangeRadioButtons() {
  const [selected, setSelected] = useState(powerRanges[0]);
  const setMinPower = useStore((state) => state.setMinPower);
  const setMaxPower = useStore((state) => state.setMaxPower);

  function onChange(data: typeof selected) {
    setSelected(data);
    setMinPower(data.range[0]);
    setMaxPower(data.range[1]);
  }

  return (
    <RadioGroup value={selected} onChange={onChange}>
      <RadioGroup.Label
        as="div"
        className="mb-4 flex items-center gap-3 text-white"
      >
        <h1 className="text-xl font-bold">Kraftwerk Leistung</h1>
        <Tooltip content="Hiermit ist die maximal mögliche Leistung eines Kraftwerks gemeint." />
      </RadioGroup.Label>
      <div className="grid grid-cols-2 gap-3">
        {powerRanges.map((powerRange) => (
          <RadioGroup.Option
            key={powerRange.name}
            value={powerRange}
            className={({ active, checked }) =>
              clsx(
                "cursor-pointer rounded-xl px-4 py-3 ring-accent transition-colors last:col-span-2 focus:outline-none sm:px-4",
                active && "transition-shadow focus-visible:ring-2",
                checked ? "bg-accent-900" : "bg-gray-900"
              )
            }
          >
            {({ checked }) => (
              <div className="leading-none">
                <RadioGroup.Label
                  as="p"
                  className={`font-medium transition-colors sm:text-sm ${
                    checked ? "text-accent" : "text-gray-300"
                  }`}
                >
                  {powerRange.name}
                </RadioGroup.Label>
                <RadioGroup.Description
                  as="span"
                  className={`whitespace-nowrap text-xs transition-colors sm:text-xs ${
                    checked ? "text-accent-600" : "text-gray-500"
                  }`}
                >
                  <span>
                    {numberFormatter.format(powerRange.range[0])} -{" "}
                    {numberFormatter.format(powerRange.range[1])}
                    kWh
                  </span>
                </RadioGroup.Description>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

export const powerRanges = [
  {
    name: "Gering",
    range: [0, 1000],
  },
  {
    name: "Mittel",
    range: [1000, 10_000],
  },
  {
    name: "Hoch",
    range: [1000, 100_000],
  },
  {
    name: "Sehr hoch",
    range: [100_000, 2_000_000],
  },
  {
    name: "Alle",
    range: [0, 2_000_000],
  },
];
const numberFormatter = Intl.NumberFormat("de-CH");
