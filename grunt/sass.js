module.exports = {
  // Настройки для разработки
  dev: {
    options: {
      outputStyle: 'nested',
      sourceMap: true
    },
    files: [{
      expand: true,
      cwd: 'src/sass',
      src: ['*.scss'],
      dest: 'dist/css',
      ext: '.css'
    }]
  },
  // Настройки для продакшна
  prod: {
    options: {
      outputStyle: 'compressed',
      sourceMap: false
    },
    files: [{
      expand: true,
      cwd: 'src/sass',
      src: ['*.scss'],
      dest: 'dist/css',
      ext: '.css'
    }]
  }
};