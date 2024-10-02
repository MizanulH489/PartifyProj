const fs = require('fs');
const path = require('path');

const csvDataPath = "data/Year Make Model Product Type Dataset.csv"; // Path to your CSV
const outputFileName = "parsed_data.json"; // Output file name
const outputFilePath = path.join("data", outputFileName); // Output file path

fs.readFile(csvDataPath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n").filter(line => line.trim() !== ""); // Filter out empty lines
  const headers = lines[0].split(",");

  const parsedData = {
    year: [],
    make: [],
    model: [],
    productType: [],
    url: []
  };

  // Loop through lines starting from the second line (skip header)
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",");

    // Directly access columns by index
    const year = row[0] ? row[0].trim() : "";           // Column 1: Year
    const make = row[1] ? row[1].trim() : "";           // Column 2: Make
    const model = row[2] ? row[2].trim() : "";          // Column 3: Model
    const productType = row[3] ? row[3].trim() : "";    // Column 4: Product Type
    const url = row[4] ? row[4].trim() : "";            // Column 5: URL

    // Push values into the parsedData object
    parsedData.year.push(year);
    parsedData.make.push(make);
    parsedData.model.push(model);
    parsedData.productType.push(productType);
    parsedData.url.push(url);
  }

  const jsonData = JSON.stringify(parsedData, null, 2); // Format JSON nicely

  // Write the parsed data to parsed_data.json
  fs.writeFile(outputFilePath, jsonData, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data parsed and saved to", outputFilePath);
  });
});
