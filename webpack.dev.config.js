//provides utilities for working with file and directory paths.
const path = require('path');

//require webpack to use LoaderOptionsPlugin
const webpack = require('webpack');
//define plugins to be used with postCSS
const postCSS = new webpack.LoaderOptionsPlugin({
  options: {
    context: path.join(__dirname, 'src'),
    postcss: [
      require('autoprefixer')
    ]
  }
});

// plugin for moving index.html and adding our bundled js
const htmlWebpackPlugin = require('html-webpack-plugin');
//configuration for htmlwebpackplugin
const htmlWebpackPluginConfig = new htmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  hash: true,
});

//set stylelint options
const styleLintPlugin = require('stylelint-webpack-plugin');
const stylelint = new styleLintPlugin({
  configFile: '.stylelintrc.yml',
  context: 'src/sass',
  files: '**/*.scss',
  failOnError: true,
  syntax: 'scss'
});

//config for webpack development
const config = {
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
        enforce: "pre",
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader?sourceMap','css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap']
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
  //load the HTMLwebpackplugin into webpack
  plugins: [
    htmlWebpackPluginConfig,
    postCSS,
    stylelint
  ],
};

module.exports = config;
