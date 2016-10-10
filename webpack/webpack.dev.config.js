'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval',
  name: 'browser',
  context: path.join(__dirname, "..","src"),
  debug: true,
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    './index'
  ],
  output: {
    path: path.join(__dirname, '../'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.DefinePlugin({__DEVELOPMENT__: true,'process.env.NODE_ENV': JSON.stringify('development')}),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],
  module: {
    preLoaders: [
      { test: /\.js$|\.jsx$/, loader: "eslint-loader", exclude: /node_modules/ }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: path.join(__dirname, '../src'),
        query: {
          plugins: ['transform-runtime','transform-decorators-legacy'],
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
         test: /\.scss/,
         loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader!postcss-loader")
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: [
          'url?limit=10000&name=images/[hash:8].[name].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ],
        query: {limit: 10240} 
      }
    ]
  },
  postcss: function () {
    return [require('autoprefixer'), require('precss')];
  },
  eslint: {
    configFile: path.join(__dirname, '../.eslintrc')
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  }
};


