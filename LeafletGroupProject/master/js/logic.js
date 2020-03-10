//assign urls to variables
var missingperson_data = "missingperson.geojson"

var today = new Date();

mapboxgl.accessToken = "pk.eyJ1IjoiY2hhcmxlc2Vicmlua2xleSIsImEiOiJjazdheW4waHgxOTUxM2Zxa2NqY2VpMXA4In0.hJ8wu5RhmkCrfkjo9BUSzg";
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-96, 40],
  zoom: 3
});

map.on('load', function() {

    map.addSource('missingperson', {
      type: 'geojson',
      data: 'missingperson.geojson'
    });
    // add heatmap layer here
    map.addLayer({
        id: 'missinperson-heat',
        type: 'heatmap',
        source: 'missingperson',
        maxzoom: 9,
        paint: {

          // increase intensity as zoom level increases
          'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,1,9,3
            ],

          // assign color values be applied to points depending on their density
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'transparent',
            0.05, 'blue',
            0.3, 'yellow',
            1.0, 'red'
          ],
          // increase radius as zoom increases
          'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,5,9,20
            ],
          
          // decrease opacity to transition into the circle layer
          'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,1,9,1
          ],
        }
      }, 'waterway-label'
    );

    // add circle layer here
    map.addLayer({
        id: 'missingperson-point',
        type: 'circle',
        source: 'missingperson',
        minzoom: 3,
        paint: {
          // increase the radius of the circle as the zoom level and date_last_seen value increases
          'circle-radius': ['-', today.getFullYear(), ['number', ['get', 'date_last_seen']/31536000000, 0]],
/*           'circle-color': {
            property: 'date_last_seen',
            type: 'categorical',
            stops: [
              [1950, 'red'],
              [1970, 'red'],
              [1980, 'pink'],
              [1990, 'pink'],
              [2000, 'light pink'],
              [2010, 'light pink'],
              [2020, 'yellow']
            ]
          }, */
          //'circle-stroke-color': 'white',
          //'circle-stroke-width': 1,
          'circle-opacity': {
            stops: [
              [9, 0],
              [10, 1]
            ]
          }
        }
      }, 'waterway-label'
      );
      
      map.on('click', 'missingperson-point', function(e) {
        new mapboxgl.Popup()
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML('<b>Date:</b> ' + e.features[0].properties.date_last_seen 
          + "</p>" + '<b>Gender:</b> ' + e.features[0].properties.gender
          + "</p>" + '<b>Age:</b> ' + e.features[0].properties.age
          )
          .addTo(map);
      });


  });

