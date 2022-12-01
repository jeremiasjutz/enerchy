import create from "zustand";
import { initialCategories, ProductionPlantCategory } from "../types";

interface State {
  minPower: number;
  maxPower: number;
  categories: ProductionPlantCategory[];
  toggleCategory: (category: ProductionPlantCategory) => void;
  setMinPower: (minPower: number) => void;
  setMaxPower: (maxPower: number) => void;
}

export const useStore = create<State>((set) => ({
  minPower: 0,
  maxPower: 1000,
  categories: initialCategories,
  toggleCategory: (category) =>
    set((state) => ({
      categories: state.categories.map((cat) => {
        if (cat.id === category.id) {
          cat.isChecked = !cat.isChecked;
        }
        return cat;
      }),
    })),
  setMinPower: (minPower) => set({ minPower }),
  setMaxPower: (maxPower) => set({ maxPower }),
}));
