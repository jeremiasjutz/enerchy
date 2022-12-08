import clsx from "clsx";
import * as Slider from "@radix-ui/react-slider";
import { useEffect, useState } from "react";
import { useStore } from "../../store";

export function ScaleSlider() {
  const scale = useStore((state) => state.scale);
  const setScale = useStore((state) => state.setScale);
  const [internalScale, setInternalScale] = useState(scale);
  useEffect(() => {
    setInternalScale(scale);
  }, [scale]);

  return (
    <div>
      <div className="mb-4 flex justify-between text-white">
        <h1 className="text-xl font-bold">
          Skalierung <span className="ml-1 text-sm">{internalScale}x</span>
        </h1>
        <button
          className="rounded-lg px-2 py-1 text-xs text-gray-400 ring-gray-500 transition-shadow focus:outline-none focus-visible:ring-2"
          onClick={() => {
            setScale(0.5);
            setInternalScale(0.5);
          }}
        >
          Zurücksetzen
        </button>
      </div>
      <Slider.Root
        defaultValue={[scale]}
        value={[internalScale]}
        onValueChange={([value]) => setInternalScale(value)}
        onValueCommit={([value]) => setScale(value)}
        max={3}
        min={0.1}
        step={0.1}
        aria-label="value"
        className="relative flex h-5 touch-none items-center"
      >
        <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-900">
          <Slider.Range className="absolute h-full rounded-full bg-accent-700" />
        </Slider.Track>
        <Slider.Thumb
          className={clsx(
            "block h-5 w-5 rounded-md bg-accent transition-shadow",
            "focus:outline-none focus-visible:ring focus-visible:ring-accent-500 focus-visible:ring-opacity-75"
          )}
        />
      </Slider.Root>
    </div>
  );
}
