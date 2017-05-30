const fs = require('fs');
const moment = require('moment');
const cheerio = require('cheerio');
const pretty = require('pretty');

const data = require('../src/data/locations.json');
const input = 'src/index.html';
const output = 'dist/index.html';

const now = moment().format('MMMM Do, YYYY');

fs.readFile(input, 'utf8', (err, html) => {
  if (err) console.error(err);
  const $ = cheerio.load(html)
  const listItems = data.features
    .map(createSlide)
    .join('');

  $('.slides').append(listItems);
  $('.last-updated').append(`Last updated: ${now}`);

  writeFile( pretty($.html()) );
});

function createSlide(feature) {
  return `
    <li class="slide" aria-hidden="true">
      <h2>${feature.properties.heading}</h2>
      <p>${feature.properties.text}</p>
      <ul class="image-gallery">
        ${feature.properties.images
            .map(createImage)
            .join('')}
      </ul>
    </li>
  `;
}

function createImage(image) {
  return `
    <li>
      <figure>
        <img src="./images/${image.name}" alt="${image.alt}" />
        <figcaption>${image.caption}</figcaption>
      </figure>
    </li>
  `;
}

function writeFile(html) {
  fs.writeFile(output, html, 'utf8', (err) => {
    if (err) console.error(err);
  });
}
