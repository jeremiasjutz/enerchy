import create from "zustand";
import {
  initialCategories,
  ProductionPlantCategory,
  ProductionPlant,
  ProductionPlantCategoryId,
} from "../types";

interface State {
  minPower: number;
  maxPower: number;
  maxPowerOutput: ProductionPlant | [];
  filteredProductionPlants: ProductionPlant[];
  categories: ProductionPlantCategory[];
  checkedCategories: ProductionPlantCategoryId[];
  setMinPower: (minPower: number) => void;
  setMaxPower: (maxPower: number) => void;
  setCategories: (categories: ProductionPlantCategory[]) => void;
  setFilteredProductionPlants: (
    filteredProductionPlants: ProductionPlant[]
  ) => void;
  toggleCheckedCategory: (category: ProductionPlantCategoryId) => void;
}

export const useStore = create<State>((set) => ({
  minPower: 0,
  maxPower: 1000,
  filteredProductionPlants: [],
  maxPowerOutput: [],
  categories: initialCategories,
  checkedCategories: [
    ProductionPlantCategoryId.Water,
    ProductionPlantCategoryId.Solar,
  ],
  setMinPower: (minPower) => set({ minPower }),
  setMaxPower: (maxPower) => set({ maxPower }),
  setCategories: (categories) => set({ categories }),
  setFilteredProductionPlants: (filteredProductionPlants) =>
    set({
      filteredProductionPlants,
      maxPowerOutput: filteredProductionPlants.reduce((prev, cur) =>
        prev[2] > cur[2] ? prev : cur
      ),
    }),
  toggleCheckedCategory: (category) =>
    set((state) => ({
      checkedCategories: state.checkedCategories.includes(category)
        ? state.checkedCategories.filter((cat) => cat !== category)
        : [...state.checkedCategories, category],
    })),
}));
