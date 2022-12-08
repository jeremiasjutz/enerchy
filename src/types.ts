import {
  Atom,
  Droplet,
  GasTankDrop,
  Leaf,
  OilIndustry,
  SunLight,
  Trash,
  Wind,
} from "iconoir-react";

export type ProductionPlant = [number, number, number, number];

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
    isRenewableEnergy: true,
  },
  {
    id: ProductionPlantCategoryId.Solar,
    label: "Solarenergie",
    icon: SunLight,
    currentAmount: 0,
    totalCapacity: 0,
    isRenewableEnergy: true,
  },
  {
    id: ProductionPlantCategoryId.Wind,
    label: "Windenergie",
    icon: Wind,
    currentAmount: 0,
    totalCapacity: 0,
    isRenewableEnergy: true,
  },
  {
    id: ProductionPlantCategoryId.Biomass,
    label: "Biomasse",
    icon: Leaf,
    currentAmount: 0,
    totalCapacity: 0,
    isRenewableEnergy: true,
  },
  {
    id: ProductionPlantCategoryId.Nuclear,
    label: "Kernenergie",
    icon: Atom,
    currentAmount: 0,
    totalCapacity: 0,
    isRenewableEnergy: false,
  },
  {
    id: ProductionPlantCategoryId.Oil,
    label: "Erdöl",
    icon: OilIndustry,
    currentAmount: 0,
    totalCapacity: 0,
    isRenewableEnergy: false,
  },
  {
    id: ProductionPlantCategoryId.Gas,
    label: "Erdgas",
    icon: GasTankDrop,
    currentAmount: 0,
    totalCapacity: 0,
    isRenewableEnergy: false,
  },
  {
    id: ProductionPlantCategoryId.Waste,
    label: "Abfälle",
    icon: Trash,
    currentAmount: 0,
    totalCapacity: 0,
    isRenewableEnergy: false,
  },
];
