module.exports = {
  plugins: {
    autoprefixer: {},
    'cssnano': {
      'cssnano-preset-advanced': {
        zindex: false,
        autoprefixer: false
      }
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  }
}
