import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";

import Content from "./components/Content";
import Onboarding from "./components/Onboarding";

const skipOnboarding = false;

export default function App() {
  const [showMain, setShowMain] = useState(false);
  const [y, setY] = useState<string | number>(skipOnboarding ? 0 : "100%");
  const [opacity, setOpacity] = useState(skipOnboarding ? 1 : 0);
  const scrollToHeatMap = useCallback(() => {
    setShowMain(true);
    setY(0);
    setOpacity(1);
  }, []);
  return (
    <>
      <AnimatePresence>
        {!showMain && !skipOnboarding && (
          <Onboarding scrollToHeatMap={scrollToHeatMap} />
        )}
      </AnimatePresence>
      <Content y={y} opacity={opacity} />
    </>
  );
}
