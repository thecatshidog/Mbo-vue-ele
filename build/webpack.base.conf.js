const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const utils = require('./utils');

const vendor = [
  'vue',
  'vue-router',
  'vuex',
  'axios'
];


module.exports = {
  entry: {
    main: './src/main.ts',
    vendor: vendor,
  },
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    publicPath: '/',
    filename: '[name].[hash:7].js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json', '.scss'],
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
      'vue$': path.resolve(__dirname, '..', 'node_modules/vue/dist/vue.esm.js'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              'scss': 'vue-style-loader!css-loader!sass-loader',
              'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            }
          }
        }
      },
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: {
          loader: 'tslint-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          }
        },
        exclude: [/node_modules/, /vue\/src/, /webpack/]
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          }
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('imgs/[name].[hash:7].[ext]')
          }
        }],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: Infinity,
    })
  ]
}