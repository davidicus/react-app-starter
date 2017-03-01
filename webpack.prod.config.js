//provides utilities for working with file and directory paths.
var path = require('path');

var webpack = require('webpack');
var postCSS = new webpack.LoaderOptionsPlugin({
  options: {
    context: path.join(__dirname, 'src'),
    postcss: [
      require('autoprefixer')
    ]
  }
});
// plugin for moving index.html and adding our bundled js
var htmlWebpackPlugin = require('html-webpack-plugin');
//configuration for htmlwebpackplugin: tells the template, what to name the file and where to inject the script tag
var htmlWebpackPluginConfig = new htmlWebpackPlugin({
  minify: {
    collapseWhitespace: true
  },
  template: __dirname + '/src/index.html',
  hash: true,
});

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ExtractCSS =  new ExtractTextPlugin({
  filename: 'main.css',
  disable: false,
  allChunks: true
});

//config for webpack development
var config = {
  context: path.join(__dirname, 'src'),
  entry: [
    './index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index_bundled.js',
  },
  devtool: 'source-map',
  module: {
   //all loaders used in webpack
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap'],
          publicPath: "/dist",
      })
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file?name=img/[name].[ext]'
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  //load the plugins into webpack
  plugins: [
    htmlWebpackPluginConfig,
    postCSS,
    ExtractCSS
  ],
};

module.exports = config;
