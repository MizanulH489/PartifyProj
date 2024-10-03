
// function to go through csv and parse
function parseCSVData(csv) {
  const parsed = Papa.parse(csv, {
      header: true,  
      dynamicTyping: true 
  });
  return parsed.data;
}

function getUniqueOptions(data, key) {
  return [...new Set(data.map(item => item[key]))].sort();
}

function populateDropdown(dropdownId, options) {
  const dropdown = document.getElementById(dropdownId);
  options.forEach(option => {
      const newOption = document.createElement("option");
      newOption.value = option;
      newOption.textContent = option;
      dropdown.appendChild(newOption);
  });
}

// function to use CSV for dropdown
function loadCSV() {
  fetch('data/Year Make Model Product Type Dataset.csv')
   .then(response => {
       if (!response.ok) {
           throw new Error("Failed to load CSV file.");
       }
       return response.text();
   })
   .then(csvData => {
       console.log("CSV Data fetched:", csvData);
       const vehicleData = parseCSVData(csvData);
       console.log("Parsed vehicle data:", vehicleData);


          // dropdown menu function 
          populateDropdown("year", getUniqueOptions(vehicleData, "Year"));
          populateDropdown("make", getUniqueOptions(vehicleData, "Make"));
          populateDropdown("model", getUniqueOptions(vehicleData, "Model"));
          populateDropdown("product-type", getUniqueOptions(vehicleData, "Product Type"));

          // Form function to allow for dropdowm menu
          document.getElementById("vehicle-form").addEventListener("submit", function (event) {
              event.preventDefault();

              const year = document.getElementById("year").value;
              const make = document.getElementById("make").value;
              const model = document.getElementById("model").value;
              const productType = document.getElementById("product-type").value;

              const selectedItem = vehicleData.find(item =>
                  item.Year === year && item.Make === make && item.Model === model && item["Product Type"] === productType
              );

              if (selectedItem) {
                  window.open(selectedItem.URL, '_blank');
              } else {
                  alert(" Enter in new part.");
              }
          });
      })
      .catch(error => {
          console.error('Error loading the CSV file:', error);
      });
}

// main form for partify 
document.getElementById("vehicle-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // get user input
  const year = document.getElementById("year").value;
  const make = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const productType = document.getElementById("product-type").value;

  // search function to go to url with search paramters
  let url = `https://partifyusa.com/collections/${year}-${make}-${model}`;
  
  if (productType) {
      url += `/type_${productType.replace(' ', '-')}`;
  }

  window.open(url, '_blank');
});

document.addEventListener("DOMContentLoaded", loadCSV);
