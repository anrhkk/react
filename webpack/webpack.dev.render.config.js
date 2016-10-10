'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval',
  name: "server-side rendering",
  context: path.join(__dirname, "../"),
  target: "node",
  entry: {
    render: ['babel-polyfill','./src/render.js']
  },
  output: {
    path: './dist',
    filename: 'render.js',
    publicPath: '/',
    libraryTarget: "commonjs2"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({__DEVELOPMENT__: true,'process.env.NODE_ENV': JSON.stringify('development')}),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
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
        include: path.join(__dirname, '..', 'src'),
        query: {
          plugins: ['transform-decorators-legacy','syntax-async-functions'],
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
         loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {test: /\.(jpe?g|png|gif|svg)$/,
        loader: [
          'url?limit=10000&name=images/[hash:8].[name].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ],
        query: {limit: 10240} 
      }
    ]
  },
  eslint: {
    configFile: path.join(__dirname, '../.eslintrc')
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
    modulesDirectories: [
      "src", "node_modules"
    ]
  }
};


