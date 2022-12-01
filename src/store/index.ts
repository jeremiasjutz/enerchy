import create from "zustand";
import {
  initialCategories,
  ProductionPlantCategory,
  ProductionPlant,
} from "../types";

interface State {
  minPower: number;
  maxPower: number;
  largestPowerOutputInSelection: ProductionPlant | [];
  filteredProductionPlants: ProductionPlant[];
  categories: ProductionPlantCategory[];
  setMinPower: (minPower: number) => void;
  setMaxPower: (maxPower: number) => void;
  setFilteredProductionPlants: (
    filteredProductionPlants: ProductionPlant[]
  ) => void;
  toggleCategory: (category: ProductionPlantCategory) => void;
}

export const useStore = create<State>((set) => ({
  minPower: 0,
  maxPower: 1000,
  filteredProductionPlants: [],
  largestPowerOutputInSelection: [],
  categories: initialCategories,
  setMinPower: (minPower) => set({ minPower }),
  setMaxPower: (maxPower) => set({ maxPower }),
  setFilteredProductionPlants: (filteredProductionPlants) =>
    set({
      filteredProductionPlants,
      largestPowerOutputInSelection: filteredProductionPlants.reduce(
        (prev, cur) => (prev[2] > cur[2] ? prev : cur),
        [-1, -1, -1, -1, -1, ""]
      ),
    }),
  toggleCategory: (category) =>
    set((state) => ({
      categories: state.categories.map((cat) => {
        if (cat.id === category.id) {
          cat.isChecked = !cat.isChecked;
        }
        return cat;
      }),
    })),
}));
