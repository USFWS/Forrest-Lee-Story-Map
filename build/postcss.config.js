module.exports = {
  map: false,
  plugins: [
    require('autoprefixer')({ browsers: ['IE 9']}),
    require('cssnano')
  ]
}
