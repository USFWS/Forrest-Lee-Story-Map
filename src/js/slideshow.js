const mediator = require('./mediator');

const Slideshow = function(opts) {
  // Get a list of slides to work width
  // Could add error handling that we're getting a UL/OL with child LI slides
  this.container = opts.slides;
  this.slides = Array.from(opts.slides.querySelectorAll('li.slide'));
  const figures = Array.from(opts.slides.querySelectorAll('figure'));

  // Start on the correct slide (value from user: 1 = first slide, 2 = second, etc.)
  const isValidIndex = opts.currentSlide > 0 && opts.currentSlide < this.slides.length + 1;
  this.currentSlide =  isValidIndex ? opts.currentSlide -1 : 0;
  this.slides.forEach(s => this.deactivateSlide(s));

  this.activateSlide(this.slides[this.currentSlide]);

  // Event Listeners
  this.previousButton = opts.previousButton;
  this.nextButton = opts.nextButton;
  this.previousButton.addEventListener('click', this.previous.bind(this));
  this.nextButton.addEventListener('click', this.next.bind(this));
  this.container.addEventListener('click', figureEventHandler);
  document.body.addEventListener('keyup', keyHandler.bind(this));
}

Slideshow.prototype.next = function() {
  const index = this.currentSlide;
  if (index === this.slides.length - 1) {
    this.deactivateSlide(this.slides[index]);
    this.activateSlide(this.slides[0]);
    this.currentSlide = 0;
    mediator.emit('slide', this.currentSlide);
    return;
  }
  this.deactivateSlide(this.slides[index]);
  this.activateSlide(this.slides[index + 1]);
  this.currentSlide = index + 1;
  mediator.emit('slide', this.currentSlide);
}

Slideshow.prototype.previous = function() {
  const index = this.currentSlide;
  if (index === 0) {
    this.deactivateSlide(this.slides[index]);
    this.activateSlide(this.slides[this.slides.length - 1]);
    this.currentSlide = this.slides.length - 1;
    mediator.emit('slide', this.currentSlide);
    return;
  }
  this.deactivateSlide(this.slides[index]);
  this.activateSlide(this.slides[index - 1]);
  this.currentSlide = index - 1;
  mediator.emit('slide', this.currentSlide);
}

Slideshow.prototype.goTo = function(index) {
  this.slides.forEach(s => this.deactivateSlide(s))
  this.activateSlide(this.slides[index]);
  mediator.emit('slide', index);
}

Slideshow.prototype.deactivateSlide = function(slide) {
  slide.setAttribute('aria-hidden', 'true');
}

Slideshow.prototype.activateSlide = function(slide) {
  slide.setAttribute('aria-hidden', 'false');
}

function figureEventHandler(e) {
  const figure = e.target.parentNode;
  const alt = e.target.alt;
  const src = e.target.src;
  const caption = figure.querySelector('figcaption').innerHTML;
  if (figure.nodeName !== 'FIGURE') return;
  mediator.emit('click:figure', {src, alt, caption})
}

function keyHandler(e) {
  const key = e.which || e.keyCode;
  if (key === 39) this.next();
  if (key === 37) this.previous();
}

module.exports = Slideshow;
