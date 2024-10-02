document.getElementById("vehicle-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const year = document.getElementById("year").value;
    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value;
    const productType = document.getElementById("product-type").value;

    let url = `https://partifyusa.com/collections/${year}-${make}-${model}`;
    
    if (productType) {
        url += `/type_${productType.replace(' ', '-')}`;
    }

    window.open(url, '_blank');
});


document.addEventListener('DOMContentLoaded', () => {
    fetch('data\parsed_data.json')
      .then(response => response.json())
      .then(data => {
        const yearInput = document.getElementById("year");
        const makeInput = document.getElementById("make");
        const modelInput = document.getElementById("model");
        const productTypeInput = document.getElementById("product-type");
  
        function filterData(year, make, model, productType) {
          return data.filter(item => {
            return (
              (!year || item.year === year) &&
              (!make || item.make.toLowerCase() === make.toLowerCase()) &&
              (!model || item.model.toLowerCase() === model.toLowerCase()) &&
              (!productType || item.productType.toLowerCase() === productType.toLowerCase())
            );
          });
        }
  
        function updateFields(filteredData) {
          if (filteredData.length > 0) {
            const firstMatch = filteredData[0];
            yearInput.value = firstMatch.year;
            makeInput.value = firstMatch.make;
            modelInput.value = firstMatch.model;
            productTypeInput.value = firstMatch.productType;
          } else {
            // Handle case where no matching data found
            // You can clear the fields or display an error message
            yearInput.value = "";
            makeInput.value = "";
            modelInput.value = "";
            productTypeInput.value = "";
          }
        }
  
        // Add event listeners to input fields
        yearInput.addEventListener('input', () => {
          const filteredData = filterData(yearInput.value, makeInput.value, modelInput.value, productTypeInput.value);
          updateFields(filteredData);
        });
  
        makeInput.addEventListener('input', () => {
          const filteredData = filterData(yearInput.value, makeInput.value, modelInput.value, productTypeInput.value);
          updateFields(filteredData);
        });
  
        modelInput.addEventListener('input', () => {
          const filteredData = filterData(yearInput.value, makeInput.value, modelInput.value, productTypeInput.value);
          updateFields(filteredData);
        });
  
        productTypeInput.addEventListener('input', () => {
          const filteredData = filterData(yearInput.value, makeInput.value, modelInput.value, productTypeInput.value);
          updateFields(filteredData);
        });
      })
      .catch(error => console.error('Error loading data:', error));
  });
