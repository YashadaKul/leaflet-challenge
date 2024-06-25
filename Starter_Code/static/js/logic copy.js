// Create a map object.
let myMap = L.map("map", {
  center: [-30.8, 130.9],
  zoom: 5
});


// Add a tile layer and add to "my map"
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Loop through the earthquake json, and create one marker for each earthquake.
for (let i = 0; i < response.length; i++) {
  //Create a cirlce conditional 
  let color = "";
  if (countries[i].gdp_pc > 100000) {
    color = "yellow";
  }
  else if (countries[i].gdp_pc > 75000) {
    color = "blue";
  }
  else if (countries[i].gdp_pc > 50000) {
    color = "green";
  }
  else {
    color = "violet";
  }
  //Create a marker
  
  L.circle(response[i].features.mag {
    fillOpacity: 0.75,
    color: "white",
    fillColor: "purple",
    // Setting our circle's radius to equal the output of our markerSize() function:
    // This will make our marker's size proportionate to its population.
    radius: markerSize(cities[i].population)
  }).bindPopup(`<h1>${cities[i].name}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`).addTo(myMap);
}

//and after this we have to bind it to a json call with probably D3. 





//Here let me write code that I dont need now but may need later:
// Define a markerSize() function that will give each city a different radius based on its population.
function markerSize(population) {
  return Math.sqrt(population) * 50;
}