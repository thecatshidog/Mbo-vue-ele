const path = require('path');

module.exports = {
  prod: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './static'
  },
  dev: {
    env: require('./dev.env'),
    port: 3000,
    host: 'localhost'
  },
}