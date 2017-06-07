const qs = require('query-string');

const state = require('./state')
const Slideshow = require('./slideshow');
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

const navigation = new Slideshow({
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

// const keyHandler = (e) => {
//   const key = e.keyCode ? e.keyCode : e.which;
//   let slideIndex = navigation.currentSlide;
//   if (key === 37) {
//     slideIndex = slideIndex - 1;
//     if (slideIndex < 0) slideIndex = 0;
//   }
//   if (key === 39) {
//     slideIndex = slideIndex + 1;
//     if (slideIndex > navigation.slides.length - 1) slideIndex = 0;
//   }
//   mediator.emit('slide', slideIndex);
//   navigation.currentSlide = slideIndex;
// }

// window.addEventListener('keyup', keyHandler);

// isGreaterThanNumberOfSlides
// isNegativeIndex
