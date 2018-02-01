const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const config = require('../config');
const webpackBaseConfig = require('./webpack.base.conf');

module.exports = merge(webpackBaseConfig, {
  entry: {
    main: [
      `webpack-dev-server/client?http://${config.dev.host}:${config.dev.port}`,
      'webpack/hot/dev-server',
      './src/main.ts',
    ]
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})