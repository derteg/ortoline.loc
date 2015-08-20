module.exports = {

  options: {
    spawn: false,
    livereload: true
  },

  scripts: {
    files: [
      'src/js/*.js'
    ],
    tasks: [
      'newer:jshint',
      'newer:uglify'
    ]
  },

  styles: {
    files: [
      'src/sass/**/*.scss'
    ],
    tasks: [
      'sass:dev'
    ]
  },
};