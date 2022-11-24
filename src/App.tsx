import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";

import Content from "./components/Content";
import Onboarding from "./components/Onboarding";

export default function App() {
  const [showMain, setShowMain] = useState(false);
  const [y, setY] = useState<string | number>("100%");
  const [opacity, setOpacity] = useState(0);
  const scrollToHeatMap = useCallback(() => {
    setShowMain(true);
    setY(0);
    setOpacity(1);
  }, []);
  return (
    <>
      <AnimatePresence>
        {!showMain && <Onboarding scrollToHeatMap={scrollToHeatMap} />}
      </AnimatePresence>
      <Content y={y} opacity={opacity} />
    </>
  );
}
