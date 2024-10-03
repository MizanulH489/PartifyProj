
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


          // Populate dropdowns with unique values
          populateDropdown("year", getUniqueOptions(vehicleData, "Year"));
          populateDropdown("make", getUniqueOptions(vehicleData, "Make"));
          populateDropdown("model", getUniqueOptions(vehicleData, "Model"));
          populateDropdown("product-type", getUniqueOptions(vehicleData, "Product Type"));

          // Handle form submission
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
                  alert("No matching product found.");
              }
          });
      })
      .catch(error => {
          console.error('Error loading the CSV file:', error);
      });
}


document.getElementById("vehicle-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Capture user input
  const year = document.getElementById("year").value;
  const make = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const productType = document.getElementById("product-type").value;

  // Build the URL dynamically
  let url = `https://partifyusa.com/collections/${year}-${make}-${model}`;
  
  if (productType) {
      url += `/type_${productType.replace(' ', '-')}`;
  }

  // Open the URL in a new tab without closing the current page
  window.open(url, '_blank');
});

// Run the CSV loading function on page load
document.addEventListener("DOMContentLoaded", loadCSV);
