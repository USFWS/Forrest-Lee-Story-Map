const fs = require('fs');
const moment = require('moment');

const input = 'src/index.html';
const output = 'dist/index.html';
const DATE_PLACEHOLDER = /REPLACE_WITH_DATE/g;
const now = moment().format('MMMM Do, YYYY');

const html = fs.readFileSync(input, 'utf8');
const finalHtml = html.replace(DATE_PLACEHOLDER, now);
fs.writeFileSync(output, finalHtml, 'utf8');
