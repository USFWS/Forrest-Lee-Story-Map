const mapboxgl = require('mapbox-gl');
const state = require('./state')
mapboxgl.accessToken = 'pk.eyJ1Ijoicmhld2l0dCIsImEiOiJjajMzZ3k3MzcwMDFrMnhtd3J2emdldXQ1In0.O9y-1Rq14cuTD-Vgwkaa5g';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/bright-v9', //satellite // bright
  center: [-98.583333, 39.833333],
  zoom: 5
});

map.fitBounds([
  [-124.848974, 24.396308],
  [-66.885444, 49.384358]
]);

const addLayer = locations => {
  map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": {
      "type": "geojson",
      "data": locations
    },
    "layout": {
      "icon-image": "{icon}-15",
      "text-field": "{label}",
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 0.6],
      "text-anchor": "top"
    }
  });
}
map.on('load', () => {
  state.init('../data/locations.js', (err, data) => {
    if (err) console.error(err);
    addLayer(data);
  });
});

// Display result of browser test (WebGL) if this function fails
// mapboxgl.supported();
