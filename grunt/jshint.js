module.exports = {

  options: {
    reporter: require('jshint-stylish'),
    ignores: ['src/js/plugins.js'],
  },
  main: [
    'src/js/*.js'
  ]
};