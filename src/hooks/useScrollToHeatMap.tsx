import { useEffect } from "react";

export function useScrollToHeatMap(callback: () => void) {
  useEffect(() => {
    const wheelEventHandler = (e: WheelEvent) => {
      const { deltaY } = e;
      if (deltaY > 0) {
        callback();
      }
    };

    let touchStart: number;

    const touchStartEventHandler = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY;
    };

    const touchMoveEventHandler = (e: TouchEvent) => {
      if (touchStart > e.changedTouches[0].clientY + 5) {
        callback();
      }
    };

    document.addEventListener("wheel", wheelEventHandler);
    document.addEventListener("touchstart", touchStartEventHandler);
    document.addEventListener("touchmove", touchMoveEventHandler);
    return () => {
      document.removeEventListener("wheel", wheelEventHandler);
      document.removeEventListener("touchstart", touchStartEventHandler);
      document.removeEventListener("touchmove", touchMoveEventHandler);
    };
  }, []);
}
