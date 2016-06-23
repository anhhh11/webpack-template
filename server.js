/*eslint-disable no-console, no-var */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');

const app = express();
const port = 8080;
const webpackCfg = webpack(WebpackConfig);


// Start watching and bundling tests here
var tests = require('./webpack.test.config'),
  testsCompiler = webpack(tests);

testsCompiler.watch({}, function (err,stats) {
  if (err) console.log(err);
  console.log('Test files bundled');
  console.log(stats.toString({colors:true}));
});


app.use(webHotMiddleware(webpackCfg));

app.use(webpackDevMiddleware(webpackCfg, {
  publicPath: 'http://0.0.0.0:' + port + '/__build__/',
  stats: {colors: true}
}));

app.use(express.static(__dirname));

app.listen(port, function () {
  console.log('Server listening on http://0.0.0.0:' + port + ', Ctrl+C to stop');
});