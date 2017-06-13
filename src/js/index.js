const qs = require('query-string');

const state = require('./state')
const Gallery = require('./gallery');
const Lightbox = require('./lightbox');
const Map = require('./map');
const mediator = require('./mediator');

const parsed = qs.parse(location.search);

const prevButton = document.querySelector('button.previous');
const nextButton = document.querySelector('button.next');

const lightbox = new Lightbox(document.querySelector('.lightbox'));

let map;

state.init('./data/locations.js', (err, data) => {
  if (err) console.error(err);

  map = new Map({
    container: 'map',
    center: [-98.583333, 39.833333],
    zoom: 5,
    locations: data
  });

  mediator.emit('slide', parseInt(parsed.slide -1) || 0);
});

const navigation = new Gallery({
  currentSlide: parsed.slide || 0,
  slides: document.querySelector('.slides'),
  previousButton: prevButton,
  nextButton: document.querySelector('button.next')
});

mediator.on('slide', i => i === 0 ? toggleButtonColor('add') : toggleButtonColor('remove'));

function toggleButtonColor(action) {
  const prevSVG = prevButton.querySelector('svg');
  const nextSVG = nextButton.querySelector('svg');
  prevSVG.classList[action]('dark');
  nextSVG.classList[action]('dark');
}
