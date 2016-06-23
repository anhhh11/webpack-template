/**
 * Created by anhhh11 on 4/19/2016.
 */
const webpack = require('webpack');
const path = require('path');
module.exports = {

  devtool: 'source-map',
  // ?path=http://localhost:8080/__webpack_hmr
  entry: path.join(__dirname, 'entry.js'),

  output: {
    path: __dirname + '/__build__',
    filename: 'app.js',
    // chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['babel-loader'], exclude: /(node_modules|bower_components)/},
      {test: /\.json$/, loaders: ['json']},
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.png$/, loader: 'url-loader?limit=100000'},
      {test: /\.(jpg|jpeg)$/, loader: 'file-loader'},
      {test: /\.(woff|woff2|eot|ttf|svg|otf)$/, loader: 'url-loader?limit=10000'} //url-loader?limit=10000
    ]
  },

  plugins: [
    //new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.NoErrorsPlugin()
  ]
};

