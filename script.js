// CSV data as a string (you might fetch this from an external file in a real-world scenario)
const csvData = `Year,Make,Model,Product Type,URL
2011,RAM,1500,Front Bumper,https://partifyusa.com/collections/2011-RAM-1500/type_Front-Bumper
2012,RAM,1500,Front Bumper,https://partifyusa.com/collections/2012-RAM-1500/type_Front-Bumper
2013,RAM,1500,Front Bumper,https://partifyusa.com/collections/2013-RAM-1500/type_Front-Bumper
2014,RAM,1500,Front Bumper,https://partifyusa.com/collections/2014-RAM-1500/type_Front-Bumper
2015,RAM,1500,Front Bumper,https://partifyusa.com/collections/2015-RAM-1500/type_Front-Bumper
2011,RAM,1500,Rear Bumper,https://partifyusa.com/collections/2011-RAM-1500/type_Rear-Bumper
2012,RAM,1500,Rear Bumper,https://partifyusa.com/collections/2012-RAM-1500/type_Rear-Bumper
2013,RAM,1500,Rear Bumper,https://partifyusa.com/collections/2013-RAM-1500/type_Rear-Bumper
2014,RAM,1500,Rear Bumper,https://partifyusa.com/collections/2014-RAM-1500/type_Rear-Bumper
2015,RAM,1500,Rear Bumper,https://partifyusa.com/collections/2015-RAM-1500/type_Rear-Bumper
2012,RAM,2500,Tailgate,https://partifyusa.com/collections/2012-RAM-2500/type_Tailgate
2013,RAM,2500,Tailgate,https://partifyusa.com/collections/2013-RAM-2500/type_Tailgate
2014,RAM,2500,Tailgate,https://partifyusa.com/collections/2014-RAM-2500/type_Tailgate
2015,RAM,2500,Tailgate,https://partifyusa.com/collections/2015-RAM-2500/type_Tailgate
2016,RAM,2500,Tailgate,https://partifyusa.com/collections/2016-RAM-2500/type_Tailgate
2013,Toyota,Camry,Front Bumper,https://partifyusa.com/collections/2013-Toyota-Camry/type_Front-Bumper
2014,Toyota,Camry,Front Bumper,https://partifyusa.com/collections/2014-Toyota-Camry/type_Front-Bumper
2015,Toyota,Camry,Front Bumper,https://partifyusa.com/collections/2015-Toyota-Camry/type_Front-Bumper
2016,Toyota,Camry,Front Bumper,https://partifyusa.com/collections/2016-Toyota-Camry/type_Front-Bumper
2017,Toyota,Corolla,Front Bumper,https://partifyusa.com/collections/2017-Toyota-Corolla/type_Front-Bumper
2013,Toyota,Corolla,Passenger Side Fender,https://partifyusa.com/collections/2013-Toyota-Corolla/type_Passenger-Side-Fender
2014,Toyota,Corolla,Passenger Side Fender,https://partifyusa.com/collections/2014-Toyota-Corolla/type_Passenger-Side-Fender
2015,Toyota,Corolla,Passenger Side Fender,https://partifyusa.com/collections/2015-Toyota-Corolla/type_Passenger-Side-Fender
2016,Toyota,Corolla,Passenger Side Fender,https://partifyusa.com/collections/2016-Toyota-Corolla/type_Passenger-Side-Fender
2017,Toyota,Corolla,Passenger Side Fender,https://partifyusa.com/collections/2017-Toyota-Corolla/type_Passenger-Side-Fender`;

function parseCSVData(csv) {
    const lines = csv.split("\n").slice(1); 
    const data = lines.map(line => {
        const [year, make, model, productType, url] = line.split(",");
        return { year, make, model, productType, url };
    });
    return data;
}
// create a map to store data and different combos 
function getUniqueOptions(data, key) {
    return [...new Set(data.map(item => item[key]))].sort();
}

const vehicleData = parseCSVData(csvData);

function populateDropdown(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId);
    options.forEach(option => {
        const newOption = document.createElement("option");
        newOption.value = option;
        newOption.textContent = option;
        dropdown.appendChild(newOption);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    populateDropdown("year", getUniqueOptions(vehicleData, "year"));
    populateDropdown("make", getUniqueOptions(vehicleData, "make"));
    populateDropdown("model", getUniqueOptions(vehicleData, "model"));
    populateDropdown("product-type", getUniqueOptions(vehicleData, "productType"));
});

document.getElementById("vehicle-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const year = document.getElementById("year").value;
    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value;
    const productType = document.getElementById("product-type").value;

    const selectedItem = vehicleData.find(item => 
        item.year === year && item.make === make && item.model === model && item.productType === productType
    );

    if (selectedItem) {
        window.open(selectedItem.url, '_blank');
    } else {
        alert("No matching product found.");
    }
});
