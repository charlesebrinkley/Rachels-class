//assign urls to variables
var missingperson_data = "missingperson.geojson"

mapboxgl.accessToken = "pk.eyJ1IjoiY2hhcmxlc2Vicmlua2xleSIsImEiOiJjazdheW4waHgxOTUxM2Zxa2NqY2VpMXA4In0.hJ8wu5RhmkCrfkjo9BUSzg";
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-96, 40],
  zoom: 4
});

map.on('load', function() {

    map.addSource('missingperson', {
      type: 'geojson',
      data: './missingperson.geojson'
    });
    // add heatmap layer here
    map.addLayer({
        id: 'missinperson-heat',
        type: 'heatmap',
        source: 'missingperson',
        maxzoom: 15,
        paint: {

          // increase intensity as zoom level increases
          'heatmap-intensity': {
            stops: [
              [11, 1],
              [15, 3]
            ]
          },
          // assign color values be applied to points depending on their density
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'transparent',
            0.1, 'blue',
            0.5, 'yellow',
            1.0, 'red'
          ],
          // increase radius as zoom increases
          'heatmap-radius': {
            stops: [
              [11, 15],
              [15, 20]
            ]
          },
          // decrease opacity to transition into the circle layer
          'heatmap-opacity': {
            default: 1,
            stops: [
              [14, 1],
              [15, 0]
            ]
          },
        }
      }, 'waterway-label'
    );

    // add circle layer here
    map.addLayer({
        id: 'missingperson-point',
        type: 'circle',
        source: 'missingperson',
        minzoom: 14,
        paint: {
          // increase the radius of the circle as the zoom level and date_last_seen value increases
          'circle-radius': {
            property: 'date_last_seen',
            type: 'exponential',
            stops: [
              [{ zoom: 15, value: 1 }, 5],
              [{ zoom: 15, value: 62 }, 10],
              [{ zoom: 22, value: 1 }, 20],
              [{ zoom: 22, value: 62 }, 50],
            ]
          },
          'circle-color': {
            property: 'date_last_seen',
            type: 'exponential',
            stops: [
              [1970, 'rgba(236,222,239,0)'],
              [1980, 'rgb(236,222,239)'],
              [1990, 'rgb(208,209,230)'],
              [2000, 'rgb(166,189,219)'],
              [2010, 'rgb(103,169,207)'],
              [2020, 'rgb(28,144,153)'],
              [2030, 'rgb(1,108,89)']
            ]
          },
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
          'circle-opacity': {
            stops: [
              [14, 0],
              [15, 1]
            ]
          }
        }
      }, 'waterway-label'
      );
      
      map.on('click', 'missingperson-point', function(e) {
        new mapboxgl.Popup()
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML('<b>Date:</b> ' + e.features[0].properties.date_last_seen)
          .addTo(map);
      });


  });

