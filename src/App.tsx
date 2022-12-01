import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";

import Content from "./components/Content";
import Onboarding from "./components/Onboarding";

const skipOnboarding = import.meta.env.DEV ? false : false;
const hasSeenOnboarding =
  skipOnboarding && window.localStorage.getItem("hasSeenOnboarding") === "true";

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
