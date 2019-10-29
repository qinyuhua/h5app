module.exports = {
  plugins: {
    autoprefixer: {},
    'cssnano': {
      'cssnano-preset-advanced': {
        zindex: false,
        autoprefixer: false
      }
    }
  }
}
