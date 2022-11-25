import create from "zustand";
import {
  allProductionPlantCategories,
  ProductionPlantCategory,
} from "../types";

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
  categories: [ProductionPlantCategory.Water, ProductionPlantCategory.Solar],
  toggleCategory: (category) =>
    set((state) => ({
      categories: state.categories.includes(category)
        ? state.categories.filter((cat) => cat !== category)
        : [...state.categories, category],
    })),
  setMinPower: (minPower) => set({ minPower }),
  setMaxPower: (maxPower) => set({ maxPower }),
}));
