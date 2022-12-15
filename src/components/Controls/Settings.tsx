import { useStore } from "../../store";
import { Checkbox } from "./Checkbox";

export function Settings() {
  const isStatisticsPanelOpen = useStore(
    (state) => state.isStatisticsPanelOpen
  );
  const toggleStatisticsPanel = useStore(
    (state) => state.toggleStatisticsPanel
  );
  const isBorderVisible = useStore((state) => state.isBorderVisible);
  const toggleBorderVisibility = useStore(
    (state) => state.toggleBorderVisibility
  );
  return (
    <div className="grid gap-2">
      <h1 className="mb-2 text-xl font-bold text-white">Einstellungen</h1>
      <Checkbox
        htmlFor="statisticsPanelVisibility"
        checked={isStatisticsPanelOpen}
        onChange={toggleStatisticsPanel}
        label="Statistik sichtbar"
      />
      <Checkbox
        htmlFor="borderVisibility"
        checked={isBorderVisible}
        onChange={toggleBorderVisibility}
        label="Kantonsgrenzen sichtbar"
      />
    </div>
  );
}
