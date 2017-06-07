const mediator = require('./mediator');

const Lightbox = function(target) {
  this.target = target;
  this.img = target.querySelector('img');
  this.caption = target.querySelector('figcaption');
  this.close = target.querySelector('button');

  mediator.on('click:figure', this.updateSlide.bind(this));
  mediator.on('slide', this.deactivate.bind(this));
  this.close.addEventListener('click', this.deactivate.bind(this));
  this.target.addEventListener('click', clickHandler.bind(this))
}

function clickHandler(e) {
  e.stopPropagation();
  if (e.target.classList.contains('lightbox')) this.deactivate();
}

Lightbox.prototype.activate = function() {
  this.target.setAttribute('aria-hidden', false);
}

Lightbox.prototype.deactivate = function() {
  this.target.setAttribute('aria-hidden', true);
}

Lightbox.prototype.updateSlide = function(img) {
  const name = img.src.split('/').slice(-1);
  const path = ['./images/', name].join('');
  this.img.src = path;
  this.img.alt = img.alt;
  this.caption.innerHTML = img.caption;
  this.activate();
}

module.exports = Lightbox;
