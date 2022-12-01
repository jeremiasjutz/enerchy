import {
  Atom,
  Droplet,
  GasTank,
  Leaf,
  OilIndustry,
  SunLight,
  Trash,
  Wind,
} from "iconoir-react";

export type ProductionPlant = [number, number, number, number, number, string];

export enum ProductionPlantCategoryId {
  Water = 1,
  Solar = 2,
  Wind = 3,
  Biomass = 4,
  Nuclear = 6,
  Oil = 7,
  Gas = 8,
  Waste = 10,
}

export type ProductionPlantCategory = {
  id: ProductionPlantCategoryId;
  label: string;
  icon: typeof Droplet;
  isChecked: boolean;
  isRenewableEnergy: boolean;
  currentAmount: number;
  totalCapacity: number;
};

export const initialCategories = [
  {
    id: ProductionPlantCategoryId.Water,
    label: "Wasserkraft",
    icon: Droplet,
    currentAmount: 0,
    totalCapacity: 0,
    isChecked: true,
    isRenewableEnergy: true,
  },
  {
    id: ProductionPlantCategoryId.Solar,
    label: "Solarenergie",
    icon: SunLight,
    currentAmount: 0,
    totalCapacity: 0,
    isChecked: true,
    isRenewableEnergy: true,
  },
  {
    id: ProductionPlantCategoryId.Wind,
    label: "Windenergie",
    icon: Wind,
    currentAmount: 0,
    totalCapacity: 0,
    isChecked: false,
    isRenewableEnergy: true,
  },
  {
    id: ProductionPlantCategoryId.Biomass,
    label: "Biomasse",
    icon: Leaf,
    currentAmount: 0,
    totalCapacity: 0,
    isChecked: false,
    isRenewableEnergy: true,
  },
  {
    id: ProductionPlantCategoryId.Nuclear,
    label: "Kernenergie",
    icon: Atom,
    currentAmount: 0,
    totalCapacity: 0,
    isChecked: false,
    isRenewableEnergy: false,
  },
  {
    id: ProductionPlantCategoryId.Oil,
    label: "Erdöl",
    icon: OilIndustry,
    currentAmount: 0,
    totalCapacity: 0,
    isChecked: false,
    isRenewableEnergy: false,
  },
  {
    id: ProductionPlantCategoryId.Gas,
    label: "Erdgas",
    icon: GasTank,
    currentAmount: 0,
    totalCapacity: 0,
    isChecked: false,
    isRenewableEnergy: false,
  },
  {
    id: ProductionPlantCategoryId.Waste,
    label: "Abfälle",
    icon: Trash,
    currentAmount: 0,
    totalCapacity: 0,
    isChecked: false,
    isRenewableEnergy: false,
  },
];
