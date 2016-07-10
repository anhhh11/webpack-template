/**
 * Created by anhhh11 on 4/19/2016.
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const _ = require('lodash');
const packages = Object.keys(require('./package.json').dependencies);
module.exports = {

  devtool: 'eval',
  entry: {
    entry: ['webpack-hot-middleware/client?reload=true', path.join(__dirname, 'entry.js')],
    vendors: _.without(packages, 'bootstrap'),
  },

  output: {
    path: __dirname + '/__build__',
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[hash].chunk.js',
    publicPath: '/' //loading on demand path
  },

  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['babel-loader'], exclude: /(node_modules|bower_components)/},
      {test: /\.json$/, loaders: ['json']},
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!sass?sourceMap'
      },
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.png$/, loader: 'url-loader?limit=100000'},
      {test: /\.(jpg|jpeg)$/, loader: 'file-loader'},
      {test: /\.(woff|woff2|eot|ttf|svg|otf)$/, loader: 'url-loader?limit=10000'} //url-loader?limit=10000
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[hash].bundle.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.NoErrorsPlugin()
  ]
};