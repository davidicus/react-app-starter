import express from 'express';
import compression from 'compression';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.js';
import path from 'path';


const app = express();
const compiler = webpack(webpackConfig);
const ROOT_DIR = __dirname.replace('/server', '');

app.use(compression());

//for serving static assets
app.get('/', function(req, res) {
  res.sendFile(path.join(ROOT_DIR, 'src/index.html'));
})
app.use(express.static(ROOT_DIR + '/dist'));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'index_bundled.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

const server = app.listen(3000, function() {
  const host = server.address().address || localhost;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
