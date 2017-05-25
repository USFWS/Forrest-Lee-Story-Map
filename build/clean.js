const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const directories = [
  'dist/js',
  'dist/data',
  'dist/css',
  'dist/images'
];

rimraf('dist/*', err => {
  if (err) console.error(err);

  directories.forEach(path => {
    mkdirp(path, err => {
      if (err) console.error(err);
    });
  });
});
