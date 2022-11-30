import create from "zustand";
import {
  allProductionPlantCategories,
  ProductionPlantCategories,
} from "../types";

interface State {
  minPower: number;
  maxPower: number;
  categories: ProductionPlantCategories[];
  toggleCategory: (category: ProductionPlantCategories) => void;
  setMinPower: (minPower: number) => void;
  setMaxPower: (maxPower: number) => void;
}

export const useStore = create<State>((set) => ({
  minPower: 0,
  maxPower: 1000,
  categories: [
    ProductionPlantCategories.Water, 
    ProductionPlantCategories.Solar,
    ProductionPlantCategories.Wind,
    ProductionPlantCategories.Biomass,
    ProductionPlantCategories.Nuclear,
    ProductionPlantCategories.Gas,
    ProductionPlantCategories.Oil,
    ProductionPlantCategories.Waste,
  ],
  toggleCategory: (category) =>
    set((state) => ({
      categories: state.categories.includes(category)
        ? state.categories.filter((cat) => cat !== category)
        : [...state.categories, category],
    })),
  setMinPower: (minPower) => set({ minPower }),
  setMaxPower: (maxPower) => set({ maxPower }),
}));
