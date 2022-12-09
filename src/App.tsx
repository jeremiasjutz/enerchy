import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";

import Content from "./components/Content";
import Onboarding from "./components/Onboarding";

const shouldSkipOnboardingInDev = false;
const skipOnboarding = import.meta.env.DEV ? shouldSkipOnboardingInDev : false;
const hasSeenOnboarding = import.meta.env.DEV
  ? skipOnboarding
  : window.localStorage.getItem("hasSeenOnboarding") === "true";

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(
    import.meta.env.DEV ? !skipOnboarding : !hasSeenOnboarding
  );

  const [y, setY] = useState<string | number>(skipOnboarding ? 0 : "100%");
  const [opacity, setOpacity] = useState(skipOnboarding ? 1 : 0);
  const scrollToHeatMap = useCallback(() => {
    setShowOnboarding(false);
    setY(0);
    setOpacity(1);
    !hasSeenOnboarding &&
      window.localStorage.setItem("hasSeenOnboarding", "true");
  }, []);
  return (
    <>
      <AnimatePresence>
        {showOnboarding && <Onboarding scrollToHeatMap={scrollToHeatMap} />}
      </AnimatePresence>
      <Content y={y} opacity={opacity} hasSeenOnboarding={hasSeenOnboarding} />
    </>
  );
}
