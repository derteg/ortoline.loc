module.exports = {
  // Настройки для разработки
  dev: {
    options: {
      style: 'nested',
      sourcemap: true
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
      style: 'compressed',
      sourcemap: false
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