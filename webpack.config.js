//provides utilities for working with file and directory paths.
const path = require('path');

const webpack = require('webpack');
const postCSS = new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false,
  options: {
    context: path.join(__dirname, 'src'),
    postcss: [
      require('autoprefixer')
    ]
  }
});

//uglify plugin
const uglify = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true,
  compress: {
    warnings: false,
    unused: true,
    dead_code: true,
  }
});

// plugin for moving index.html and adding our bundled js
const htmlWebpackPlugin = require('html-webpack-plugin');
//configuration for htmlwebpackplugin: tells the template, what to name the file and where to inject the script tag
const htmlWebpackPluginConfig = new htmlWebpackPlugin({
  minify: {
    collapseWhitespace: (process.env.NODE_ENV === 'development') ? false : true
  },
  template: __dirname + '/src/index.html',
  hash: true,
});

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractCSS =  new ExtractTextPlugin({
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
        enforce: "pre",
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
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
              fallback: 'style-loader',
              use: ['css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap'],
              publicPath: "/dist",
          })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: 'file-loader?name=img/[name].[ext]'
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
    uglify,
    (process.env.NODE_ENV === 'development') ? stylelint : ExtractCSS
  ],
};
