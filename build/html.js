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
    .map(createListItem)
    .join('');

  $('.slides').append(listItems);
  $('.last-updated').append(`Last updated: ${now}`);

  writeFile( pretty($.html()) );
});

function createListItem(feature) {
  return `
    <li class="slide" aria-hidden="true">
      <h2>${feature.properties.label}</h2>
      <p>${feature.properties.text}</p>
    </li>
  `;
}

function writeFile(html) {
  fs.writeFile(output, html, 'utf8', (err) => {
    if (err) console.error(err);
  });
}
