//My first try:
//Here I used the earthquake code. But its a confusing code. So let me try again.
 

// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

// Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);

function createMap(earthquakes) {

    // Create the base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    // Create a baseMaps object.
    let baseMaps = {
      "Street Map": street
    };
  
    // Create an overlay object to hold our overlay.
    let overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    let myMap = L.map("map", {
      center: [
        5.0, -68.28
      ],
      zoom: 2,
      layers: [street, earthquakes]
    }).addTo(myMap);
  
  }

//Create a function for size of marker:
function markerSize(mag) {
  return Math.sqrt(mag) * 50;
}

for (let i = 0; i < features.length; i++) {

    // Conditionals for earthquake magnitude color (depth will add later)
  let color = "";
  if (features.properties.mag[i] <= 0) {
    color = "yellow";
  }
  else if (features.properties.mag[i] > 0) {
    color = "blue";
  }
  else if (features.properties.mag[i] > 5) {
    color = "green";
  }
  else {
    color = "violet";
  }
  
  // Add circles to the map.
  L.circle(response.features.geometry.coordinates[1], response.features.geometry.coordinates[0],{  
    fillOpacity: 0.75,
    color: "white",
    fillColor: "purple"
    //radius: markerSize(features[i].earthquakeMagnitude)
  }



  
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    
  //L.control.layers(baseMaps, overlayMaps, {
    //collapsed: false
  //})