const async = require('async');
const sharp = require('sharp');
const mkdirp = require('mkdirp');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const rimraf = require('rimraf');

const fs = require('fs');
const path = require('path');

const input = 'src/images/';
const output = 'dist/images/';

const outSizes = [
  {
    width: 1400,
    path: '/'
  },
  {
    width: 850,
    path: 'medium/'
  },
  {
    width: 450,
    path: 'small/'
  },
  {
    width: 125,
    path: 'tiny/'
  }
];


rimraf(`${output}*.jpg`, function(err) {
  if (err) return console.error(err);

  fs.readdir(input, (err, files) => {
    if (err) return console.error(err);


    // Remove .DS_Store files, they're the worst.
    files = files
      .filter(file => file !== '.DS_Store')
      .filter(f => f.includes('.jpg'));

    async.eachLimit(files, 5, (name, cb) => {
      const filepath = path.join(input, name);
      processImage(filepath, cb);
    });
  });
});

function processImage(filepath, done) {
  const img = sharp(filepath);
  const filename = path.basename(filepath);
  async.each(outSizes, (outsize, cb) => {
    img
      .resize(outsize.width)
      .toBuffer((err, buffer, info) => {
        if (err) console.error(err);
        const outfile = path.join(output, outsize.path, filename);
        minify(buffer, outfile, cb);
      });
  }, done);
}

function minify(buffer, filename, done) {

  imagemin.buffer(buffer, {
    plugins: [ imageminMozjpeg() ]
  }).then(buffer => {
    const directory = path.dirname(filename);
    mkdirp(directory, (err) => {
      if (err) console.log(err);
      fs.writeFile(filename, buffer, done);
    });
  }).catch(err => {
    if (done && err) return done(err);
    if (err) console.log(err);
  });
}
