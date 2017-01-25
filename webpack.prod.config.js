
//provides utilities for working with file and directory paths.
var path = require('path');
// plugin for moving index.html and adding our bundled js
var htmlWebpackPlugin = require('html-webpack-plugin');
//configuration for htmlwebpackplugin: tells the template, what to name the file and where to inject the script tag
var htmlWebpackPluginConfig = new htmlWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body'
});

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ExtractCSS =  new ExtractTextPlugin('main.css');


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
  module: {
   //all loaders used in webpack
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style', // The backup style loader
          'css?sourceMap!sass?sourceMap'
        )
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file?name=img/[name].[ext]'
      },
    ],
  },
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  //load the HTMLwebpackplugin into webpack
  plugins: [
    htmlWebpackPluginConfig,
    ExtractCSS
  ],
};

module.exports = config;
