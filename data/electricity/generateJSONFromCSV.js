import csv from "csvtojson";
import { writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePathCsv = join(__dirname, "csv");
const filePathProductionPlantsJson = join(
  __dirname,
  "..",
  "..",
  "src",
  "assets"
);
const filePathTranslationsJson = join(
  __dirname,
  "..",
  "..",
  "src",
  "assets",
  "translations"
);

createProductionPlantsAndTotalCapacityJsonFile();
createMainCategoriesJsonFile();
subCategoriesJsonFile();

async function createProductionPlantsAndTotalCapacityJsonFile() {
  let totalCapacity = 0;
  let productionPlants = await csv().fromFile(
    `${filePathCsv}/ElectricityProductionPlant.csv`
  );

  let dataArray = [];
  productionPlants = productionPlants.filter((item) => {
    return (
      item._x !== "" &&
      item._y !== "" &&
      item.SubCategory !== "subcat_9" &&
      item.SubCategory !== "subcat_5" &&
      item.TotalPower !== "" &&
      +item.TotalPower >= 10
    );
  });

  for (let item of productionPlants) {
    const totalPower = parseFloat(item.TotalPower);
    totalCapacity += totalPower;
    dataArray.push([
      +item._x,
      +item._y,
      totalPower,
      +item.SubCategory.replace("subcat_", ""),
    ]);
  }

  try {
    await writeFile(
      `${filePathProductionPlantsJson}/productionPlants.json`,
      JSON.stringify(dataArray)
    );
    console.info("productionPlants.json written successfully");
  } catch (error) {
    console.error(error);
  }

  try {
    await writeFile(
      `${filePathProductionPlantsJson}/totalCapacity.json`,
      JSON.stringify(parseInt(totalCapacity))
    );
    console.info("totalCapacity.json written successfully");
  } catch (error) {
    console.error(error);
  }
}

async function createMainCategoriesJsonFile() {
  const mainCategoriesData = await csv().fromFile(
    `${filePathCsv}/MainCategoryCatalogue.csv`
  );

  try {
    await writeFile(
      `${filePathTranslationsJson}/mainCategories.json`,
      JSON.stringify(mainCategoriesData)
    );
    console.info("mainCategories.json written successfully");
  } catch (error) {
    console.error(error);
  }
}

async function subCategoriesJsonFile() {
  let subCategoriesData = await csv().fromFile(
    `${filePathCsv}/SubCategoryCatalogue.csv`
  );

  try {
    await writeFile(
      `${filePathTranslationsJson}/subCategories.json`,
      JSON.stringify(subCategoriesData)
    );
    console.info("subCategories.json written successfully");
  } catch (error) {
    console.error(error);
  }
}
