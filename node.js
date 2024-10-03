// some concepts I was playing around with when trying to utilize the information given for the search function


const fs = require('fs');
const path = require('path');

const csvDataPath = "data/Year Make Model Product Type Dataset.csv"; 
const outputFileName = "parsed_data.json"; 
const outputFilePath = path.join("data", outputFileName); 

fs.readFile(csvDataPath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n").filter(line => line.trim() !== ""); 
  const headers = lines[0].split(",");

  const parsedData = {
    year: [],
    make: [],
    model: [],
    productType: [],
    url: []
  };

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",");

    const year = row[0] ? row[0].trim() : "";           
    const make = row[1] ? row[1].trim() : "";           
    const model = row[2] ? row[2].trim() : "";          
    const productType = row[3] ? row[3].trim() : "";    
    const url = row[4] ? row[4].trim() : "";            

    parsedData.year.push(year);
    parsedData.make.push(make);
    parsedData.model.push(model);
    parsedData.productType.push(productType);
    parsedData.url.push(url);
  }

  const jsonData = JSON.stringify(parsedData, null, 2); 

  fs.writeFile(outputFilePath, jsonData, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data parsed and saved to", outputFilePath);
  });
});
