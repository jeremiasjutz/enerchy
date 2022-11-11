export type ProductionPlant = [number, number, number, number, number, string];

export enum ProductionPlantCategories {
  Water = 1,
  Solar = 2,
  Wind = 3,
  Biomass = 4,
  Nuclear = 6,
  Oil = 7,
  Gas = 8,
  Waste = 10,
}

export enum RenewableProductionPlantCategories {
  Water = 1,
  Solar = 2,
  Wind = 3,
  Biomass = 4
}

export enum NonRenewableProductionPlantCategories {
  Nuclear = 6,
  Oil = 7,
  Gas = 8,
  Waste = 10,
}

export const productionPlantLabels: Record<string, string> = {
  Water: "Wasserkraft",
  Solar: "Photovoltaik",
  Wind: "Windenergie",
  Biomass: "Biomasse",
  Nuclear: "Kernenergie",
  Oil: "Erdöl",
  Gas: "Erdgas",
  Waste: "Abfälle",
};

export const allProductionPlantCategories = Object.values(
  ProductionPlantCategories
)
  .filter((v) => !isNaN(Number(v)))
  .map((v) => Number(v));
