//This code is now working!! donot change it!
function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    
    //then add the topo map here as well:
    //let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      //attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    //});
  
    // Create a baseMaps object to hold the streetmap and topomap layer. 
    
    let baseMaps = {
      "Street Map": streetmap,
      "Topographic Map": topo
    };
  
    // Create an overlayMaps object to hold the bikeStations layer.
    let overlayMaps = {
      "Earthquakes": earthquakes
    };
  
    // Create the map object with options.
    let map = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [streetmap, topo, earthquakes]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  //Here write the code and then delete the original code
  function createMarkers(response) {
  
    // Pull the "stations" property from response.data.
    //let stations = response.data.stations;
    let locations = response.features;
  
    // Initialize an array to hold bike markers.
    //let bikeMarkers = [];
    let earthquakeMarkers = [];
    let earthquakeCircles = [];
    let earthquakeColors = [];

    //define a function for marker size

  
    // Loop through the stations array.
    //Loop through the locations array:
    //for (let index = 0; index < stations.length; index++) {
      //let station = stations[index];
    for (let index = 0; index < locations.length; index++) {
        let location = locations[index];
  
      // For each station, create a marker, and bind a popup with the station's name.
      //For each location, create a marker, and bind a popup with the location's name:
      //let bikeMarker = L.marker([station.lat, station.lon])
        //.bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
      //let earthquakeMarker = L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]])
      //.bindPopup(" ");

      let earthquakeCircle = L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]],{
        fillOpacity: 0.75,
        color: "red",
        fillColor: "purple", //here add the name of the function
        // Setting our circle's radius to equal the output of our markerSize() function:
        // This will make our marker's size proportionate to its population.
        radius: (location.properties.mag * 20000)
        //radius: 200
      }).bindPopup(" ");
    
  
      // Add the marker to the bikeMarkers array.
      //bikeMarkers.push(bikeMarker);
      //earthquakeMarkers.push(earthquakeMarker);
      earthquakeCircles.push(earthquakeCircle);

      
    }
  
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    // Create a layer group that's made from the earthquake markers array, and pass it to the createMap function:
    //createMap(L.layerGroup(bikeMarkers));
    createMap(L.layerGroup(earthquakeCircles));
  }
  
  
  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
  