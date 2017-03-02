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
    collapseWhitespace: (process.env.NODE_ENV === 'development') ? false : true
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
module.exports = {
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
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: (process.env.NODE_ENV === 'development')
          ? ['style-loader?sourceMap', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap']
          : ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: ['css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap'],
              publicPath: "/dist",
          })
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: 'file?name=img/[name].[ext]'
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
    (process.env.NODE_ENV === 'development') ? stylelint : ExtractCSS
  ],
};
