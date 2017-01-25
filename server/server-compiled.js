'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackConfig = require('../webpack.config.js');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var compiler = (0, _webpack2.default)(_webpackConfig2.default);
var ROOT_DIR = __dirname.replace('/server', '');

app.use((0, _compression2.default)());

//for serving static assets
app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(ROOT_DIR, 'src/index.html'));
});
app.use(_express2.default.static(ROOT_DIR + '/dist'));

app.use((0, _webpackDevMiddleware2.default)(compiler, {
  hot: true,
  filename: 'index_bundled.js',
  publicPath: '/',
  stats: {
    colors: true
  },
  historyApiFallback: true
}));

var server = app.listen(3000, function () {
  var host = server.address().address || localhost;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
