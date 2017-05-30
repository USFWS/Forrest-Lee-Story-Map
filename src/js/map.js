const mapboxgl = require('mapbox-gl');
const mediator = require('./mediator');
mapboxgl.accessToken = 'pk.eyJ1Ijoicmhld2l0dCIsImEiOiJjajMzZ3k3MzcwMDFrMnhtd3J2emdldXQ1In0.O9y-1Rq14cuTD-Vgwkaa5g';
let map;

const Map = function(opts) {
  this.locations = opts.locations;

  map = new mapboxgl.Map({
    container: opts.container,
    style: 'mapbox://styles/mapbox/satellite-v9', //satellite // bright
    center: opts.center,
    zoom: opts.zoom || 5,
  });

  // Zoom to USA -- should change this
  map.fitBounds([
    [-124.848974, 24.396308],
    [-66.885444, 49.384358]
  ]);

  map.on('load', () => addLayer(map, opts.locations) );
  mediator.on('slide', this.flyTo.bind(this));
}

function addLayer(map, locations) {
  map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": {
      "type": "geojson",
      "data": locations
    },
    "layout": {
      "icon-image": "{icon}-15",
      // "text-field": "{label}",
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 0.6],
      "text-anchor": "top"
    }
  });
}

Map.prototype.flyTo = function(index) {
  const feature = this.locations.features[index - 1];
  if (!feature) return;
  map.flyTo({
    center: feature.geometry.coordinates,
    zoom: feature.properties.zoom
  });
}

module.exports = Map;

// Display result of browser test (WebGL) if this function fails
// mapboxgl.supported();
