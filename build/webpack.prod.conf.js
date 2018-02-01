const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const utils = require('./utils');
const config = require('../config');
const webpackBaseConfig = require('./webpack.base.conf');

module.exports = merge(webpackBaseConfig, {
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: ['css-loader', 'postcss-loader' ,'sass-loader']
        })
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  output: {
    path: config.prod.assetsRoot,
    filename: utils.assetsPath('js/[name].[hash].js'),
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
    new ExtractTextPlugin({
      filename: path.posix.join('/', 'css/main.[hash].css')
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  ]
})