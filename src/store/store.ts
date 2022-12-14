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
  scale: number;
  isStatisticsPanelOpen: boolean;
  isAboutPageOpen: boolean;
  isBorderVisible: boolean;
  maxPowerOutput: ProductionPlant | [];
  filteredProductionPlants: ProductionPlant[];
  categories: ProductionPlantCategory[];
  checkedCategories: ProductionPlantCategoryId[];
  setMinPower: (minPower: number) => void;
  setMaxPower: (maxPower: number) => void;
  setScale: (scale: number) => void;
  setCategories: (categories: ProductionPlantCategory[]) => void;
  setFilteredProductionPlants: (
    filteredProductionPlants: ProductionPlant[]
  ) => void;
  setAllCheckedCategories: (type: "renewable" | "nonrenewable") => void;
  toggleCheckedCategory: (category: ProductionPlantCategoryId) => void;
  toggleStatisticsPanel: () => void;
  toggleAboutPage: () => void;
  toggleBorderVisibility: () => void;
}

export const useStore = create<State>((set) => ({
  minPower: 0,
  maxPower: 1000,
  scale: 0.5,
  isStatisticsPanelOpen: true,
  isAboutPageOpen: false,
  isBorderVisible: false,
  filteredProductionPlants: [],
  maxPowerOutput: [],
  categories: initialCategories,
  checkedCategories: [
    ProductionPlantCategoryId.Water,
    ProductionPlantCategoryId.Solar,
  ],
  setMinPower: (minPower) => set({ minPower }),
  setMaxPower: (maxPower) => set({ maxPower }),
  setScale: (scale) => set({ scale }),
  setCategories: (categories) => set({ categories }),
  setFilteredProductionPlants: (filteredProductionPlants) =>
    set({
      filteredProductionPlants,
      maxPowerOutput: filteredProductionPlants.reduce((prev, cur) =>
        prev[2] > cur[2] ? prev : cur
      ),
    }),
  setAllCheckedCategories: (type) =>
    set((state) => {
      const checkedCategories = [...state.checkedCategories];
      switch (type) {
        case "renewable":
          state.categories
            .filter((cat) => cat.isRenewableEnergy && cat.currentAmount > 0)
            .forEach(
              (cat) =>
                !checkedCategories.includes(cat.id) &&
                checkedCategories.push(cat.id)
            );
          break;
        case "nonrenewable":
          state.categories
            .filter((cat) => !cat.isRenewableEnergy && cat.currentAmount > 0)
            .forEach(
              (cat) =>
                !checkedCategories.includes(cat.id) &&
                checkedCategories.push(cat.id)
            );
      }
      return { checkedCategories };
    }),
  toggleCheckedCategory: (category) =>
    set((state) => ({
      checkedCategories: state.checkedCategories.includes(category)
        ? state.checkedCategories.filter((cat) => cat !== category)
        : [...state.checkedCategories, category],
    })),
  toggleStatisticsPanel: () =>
    set((state) => ({
      isStatisticsPanelOpen: !state.isStatisticsPanelOpen,
    })),
  toggleAboutPage: () =>
    set((state) => ({
      isAboutPageOpen: !state.isAboutPageOpen,
    })),
  toggleBorderVisibility: () =>
    set((state) => ({
      isBorderVisible: !state.isBorderVisible,
    })),
}));
