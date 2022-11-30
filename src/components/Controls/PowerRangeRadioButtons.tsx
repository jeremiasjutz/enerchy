import clsx from "clsx";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useStore } from "../../store";

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
      <RadioGroup.Label as="h1" className="mb-4 text-3xl font-bold text-white">
        Kraftwerk Leistung
      </RadioGroup.Label>
      <div className="grid grid-cols-2 gap-3">
        {powerRanges.map((plan) => (
          <RadioGroup.Option
            key={plan.name}
            value={plan}
            className={({ active, checked }) =>
              clsx(
                "cursor-pointer rounded-xl px-4 py-4 ring-accent transition-colors focus:outline-none sm:px-6",
                active && "transition-shadow focus-visible:ring-2",
                checked ? "bg-accent-900" : "bg-gray-900"
              )
            }
          >
            {({ checked }) => (
              <div className="leading-none">
                <RadioGroup.Label
                  as="p"
                  className={`font-medium transition-colors sm:text-xl ${
                    checked ? "text-accent" : "text-gray-300"
                  }`}
                >
                  {plan.name}
                </RadioGroup.Label>
                <RadioGroup.Description
                  as="span"
                  className={`whitespace-nowrap text-xs transition-colors sm:text-sm ${
                    checked ? "text-accent-600" : "text-gray-500"
                  }`}
                >
                  <span>
                    {numberFormatter.format(plan.range[0])} -{" "}
                    {numberFormatter.format(plan.range[1])}
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
    name: "Klein",
    range: [0, 1000],
  },
  {
    name: "Mittel",
    range: [1000, 100_000],
  },
  {
    name: "Gross",
    range: [100_000, 2_000_000],
  },
  {
    name: "Alle",
    range: [0, 2_000_000],
  },
];
const numberFormatter = Intl.NumberFormat("de-CH");
