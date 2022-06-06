mapboxgl.accessToken = 'pk.eyJ1IjoiamJsYWVzZXIiLCJhIjoiY2t4OGVtY3FmMTh6YTJ4cXU1NWY5aXUxMiJ9.DJNRPOrzDpL4YDzTQXxaCQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jblaeser/cl3yq6ile000w14qhwryrf81k',
    zoom: 3,
  maxZoom: 9,
  minZoom: 3.5,
  center: [-99, 38],
  maxBounds: [
    [-180, 15],
    [-30, 72],
  ],
});



map.on("load", function () {
    // this is the funciton that finds the first sympbol layer
    let layers = map.getStyle().layers;
    for(var i = 0; i <layers.length; i++) {
        console.log(layers[i].id);
    }


    
    map.addLayer({
      id: "us_counties",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/counties.geojson",
      },
      paint: {
        "fill-color": [
          "match",
          ["get", "Economic_Type_Label"],
          "Nonspecialized", "#9dc7b5",
          "Maufacturing", "#92b9bd",
          "Farming", "#a8d4ad",
          "Federal/State Government", "#cde6a6",
          "Recreation", "#f2f79e",
          "Mining", "#e8ec67",
         // "Other", "#91b66e",
          "#ffffff",
        ],
      },
    }, "waterway-label");

    map.addLayer(
      {
      id: "us_states_elections_outline",
      type: "line",
      source: {
          type: "geojson",
          data: "data/statesElections.geojson",
      },
      paint: {
          "line-color": "#ffffff",
          "line-width": 0.9,
      },
      },
      "waterway-label"
  );
  map.addLayer(
      {
      id: "us_counties_elections_outline",
      type: "line",
      source: {
          type: "geojson",
          data: "data/countiesElections.geojson",
      },
      minzoom: 6,
      paint: {
          "line-color": "#ffffff",
          "line-width": 0.25,
      },
      },
      "waterway-label"
  );

  map.on('click', 'us_counties', function (e) {
    var stateName = e.features[0].properties['STATE_NAME'];
    var countyName = e.features[0].properties['NAMELSAD'];
    var economicType = e.features[0].properties['Economic_Type_Label'];
    stateName = stateName.toUpperCase();
    countyName = countyName.toUpperCase();
    economicType = economicType.toUpperCase();
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>' + countyName + ' - ' + stateName + '</h4>'
            + '<h2>' + economicType + '</h2>')
        .addTo(map);
});
map.on('mouseenter', 'us_counties', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'us_counties', function () {
    map.getCanvas().style.cursor = '';
});




    // NEW MAP

mapboxgl.accessToken = 'pk.eyJ1IjoiamJsYWVzZXIiLCJhIjoiY2t4OGVtY3FmMTh6YTJ4cXU1NWY5aXUxMiJ9.DJNRPOrzDpL4YDzTQXxaCQ';
var map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/jblaeser/cl3yq6ile000w14qhwryrf81k',
    zoom: 3,
  maxZoom: 9,
  minZoom: 3.5,
  center: [-99, 38],
  maxBounds: [
    [-180, 15],
    [-30, 72],
  ],
});


map2.on("load", function () {
    // this is the funciton that finds the first sympbol layer
    let layers = map2.getStyle().layers;
    for(var i = 0; i <layers.length; i++) {
        console.log(layers[i].id);
    }

    map2.addLayer(
      {
      id: "us_states_elections_outline",
      type: "line",
      source: {
          type: "geojson",
          data: "data/statesElections.geojson",
      },
      paint: {
          "line-color": "#ffffff",
          "line-width": 0.7,
      },
      },
      "waterway-label"
  );
      map2.addLayer(
        {
          id: "us_disaster_locations",
          type: "circle",
          source: {
            type: "geojson",
            data: "data/usDisasters.geojson",
          },
          paint: {
            'circle-radius':
    ['interpolate', ['linear'], ['zoom'],
        3, ['max', ['/', ['sqrt', ['abs', ['-', ['get', 'Trump'], ['get', 'Biden']]]], 40], 1],
        9, ['max', ['/', ['sqrt', ['abs', ['-', ['get', 'Trump'], ['get', 'Biden']]]], 15], 5],
    ],
            
            "circle-color": [
              "match",
              ["get", "disastertype"],
              "storm","#264653",
              "flood","#2a9d8f",
              "extreme temperature","#e76f51",
              "drought","#e9c46a",
              "earthquake","#91b66e",
              "landslide", "#f4a261",
              "volcanic activity", "#6b2737",
              "#a4a4a4",
            ],
            "circle-stroke-color": "#ffffff",
            "circle-stroke-width": 0.5,
            // "circle-opacity": [
            //   "step",
            //   ["get", "WnrPerc"],
            //   0.3,
            //   0.4,
            //   0.5,
            //   0.5,
            //   0.7,
            //   0.6,
            //   0.9,
           // ],
          },
          minzoom: 3,
        },
        "waterway-label"
      );
     
      map2.addLayer(
          {
          id: "us_counties_elections_outline",
          type: "line",
          source: {
              type: "geojson",
              data: "data/countiesElections.geojson",
          },
          minzoom: 6,
          paint: {
              "line-color": "#ffffff",
              "line-width": 0.25,
          },
          },
          "waterway-label"
      );

      map2.on('click', 'us_disaster_locations', function (e) {
        var stateName = e.features[0].properties.adm1;
        var cityName = e.features[0].properties.adm2;
        var year = e.features[0].properties.year;
        var disasterType = e.features[0].properties.disastertype;
        stateName = stateName.toUpperCase();
        cityName = cityName.toUpperCase();
        disasterType = disasterType.toUpperCase();
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<h4>' + cityName + ', ' + stateName + '</h4>'
                + '<h2>' + disasterType + '</h2>'
                + '<p>' + year + '</p>')
            .addTo(map2);
    });
    map2.on('mouseenter', 'us_disaster_locations', function () {
        map2.getCanvas().style.cursor = 'pointer';
    });
    map2.on('mouseleave', 'us_disaster_locations', function () {
        map2.getCanvas().style.cursor = '';
    });
  });

});





