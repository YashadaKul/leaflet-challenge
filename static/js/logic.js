//define a createMap function
function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    
    
    // Create a baseMaps object to hold the streetmap and topomap layer. 
    let baseMaps = {
      "Street Map": streetmap,
      "Topographic Map": topo
    };
  
    // Create an overlayMaps object to hold the bikeStations layer.
    let overlayMaps = {
      "Earthquakes": earthquakes
    };
  
    // Create the map object with options
    let map = L.map("map", {
      center: [19.14, 8.08],
      zoom: 2,
      layers: [streetmap, topo, earthquakes]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  //Now define a function for the circles 
  function createMarkers(response) {
  
    // Pull the "features" property from response.data.
    let locations = response.features;
  
    // Initialize an array to hold earthquake markers.
    let earthquakeCircles = [];
  
    //Loop through the locations array:
    for (let index = 0; index < locations.length; index++) {
        let location = locations[index];
        //define a function for the circle color
        function chooseColor(depth){
            if (depth <= 10) return "yellow";
            else if (depth <= 20) return "orange";
            else if (depth <= 30) return "green";
            else if (depth <= 40) return "blue";
            else if (depth <= 50) return "purple";
            else if (depth > 50) return "violet";
            else return "red";
        }
        
      //For each location, create a marker 
      let earthquakeCircle = L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]],{
        fillOpacity: 0.75,
        weight: 1,
        color: "black",
        //Use the color function defined earlier to fill color based on the depth of the earthquake
        fillColor: chooseColor(location.geometry.coordinates[2]),
        // Set the radius of the circle to be proportionate the the size of the magnitude
        radius: (location.properties.mag * 30000)
        // create a bind popup with details:
      }).bindPopup(`<h4>Earthquake Magnitude: ${location.properties.mag} </h4> <hr> <h4> Location: ${location.properties.place} </h4> <hr> <h4> Depth:${location.geometry.coordinates[2]} </h4>`);
    
      // Add the marker to the earthquakeCircles array.
         earthquakeCircles.push(earthquakeCircle);

    }
  
    // Create a layer group that's made from the earthquake markers array, and pass it to the createMap function:
    createMap(L.layerGroup(earthquakeCircles));
  }
  
  
  // Perform an API call to get the response. Call createMarkers when it completes.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
  