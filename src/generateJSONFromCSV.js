import csvToJson from "convert-csv-to-json";
import * as fs from 'fs';

const filePathCsv = 'public/data/csv/';
const filePathJson = 'public/data/json/';

createProductionPlantsJsonFile();
createMainCategoriesJsonFile();
subCategoriesJsonFile();

function createProductionPlantsJsonFile() {
    let productionPlants = csvToJson.fieldDelimiter(',').getJsonFromCsv(filePathCsv + "ElectricityProductionPlant.csv");
    let dataArray = [];
    productionPlants = productionPlants.filter((item) => item._x !== "" && item._y !== "" && item.SubCategory !== 'subcat_9' && item.SubCategory !== 'subcat_5');

    for (let item of productionPlants) {
        dataArray.push([+item._x, +item._y, +item.TotalPower, +item.MainCategory.replace('maincat_', ''), +item.SubCategory.replace('subcat_', ''), item.Canton]);
    }

    fs.writeFile(filePathJson + 'productionPlants.json', JSON.stringify(dataArray), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully");
        }
    });
}

function createMainCategoriesJsonFile() {
    let mainCategoriesData = csvToJson.fieldDelimiter(',').getJsonFromCsv(filePathCsv + "MainCategoryCatalogue.csv");

    fs.writeFile(filePathJson + 'mainCategories.json', JSON.stringify(mainCategoriesData), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully");
        }
    });
}

function subCategoriesJsonFile() {
    let subCategoriesData = csvToJson.fieldDelimiter(',').getJsonFromCsv(filePathCsv + "SubCategoryCatalogue.csv");

    fs.writeFile(filePathJson + 'subCategories.json', JSON.stringify(subCategoriesData), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully");
        }
    });
}