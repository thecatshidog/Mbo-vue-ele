const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
      require('postcss-flexbugs-fixes'),
      require('postcss-px2rem')({ remUnit: 75 }),
      autoprefixer({
          browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // Vue2 doesn't support IE8 anyway
          ],
          flexbox: 'no-2009',
      })
  ]
}