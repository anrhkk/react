var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    context: path.join(__dirname, "../"),
    entry: [
      'babel-polyfill',
      './src/index.js'
    ],
    output: {
      path: './dist',
      filename: '[hash:8].bundle.js',
      publicPath: '/'
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEVELOPMENT__: false,
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      }),
      new ExtractTextPlugin('[hash:8].style.css', { allChunks: true }),
      new HtmlWebpackPlugin({
        title: "葡萄情趣-成人之美",
        template: path.join(__dirname,'../src/render.html'),
        inject: true,
        htmlContent: '<%= __html__ %>',
        initialData: 'window.__INITIAL_STATE__ = <%= __state__ %>',
        hash: false,   //为静态资源生成hash值
        minify:{    //压缩HTML文件
          removeComments:true,    //移除HTML中的注释
          collapseWhitespace:true    //删除空白符与换行符
        }
      })
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
      extensions: ['', '.js', '.jsx','.scss','.css'],
      modulesDirectories: [
        "src", "node_modules"
      ]
    }
  }, {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(__dirname, "../"),
    target: "node",
    entry: {
      server: ['babel-polyfill','./src/render']
    },
    output: {
      path: './dist',
      filename: "render.js",
      publicPath: "/",
      libraryTarget: "commonjs2"
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        __DEVELOPMENT__: false,
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.IgnorePlugin(/vertx/)
    ],
    module: {
      preLoaders: [
        { test: /\.js$|\.jsx$/, loader: "eslint-loader", exclude: /node_modules/ }
      ],
      loaders: [
        {
          test: /\.js$|\.jsx$/,
          loader: 'babel',
          query: {
            "presets": ["es2015", "react", "stage-0"],
            "plugins":["transform-decorators-legacy","syntax-async-functions"]
          },
          include: path.join(__dirname, '..', 'src'),
          exclude: /node_modules/,
        },
        { test: /\.json$/, loader: "json-loader" },
        {
          test: /\.(jpe?g|png|gif)$/i,
          loaders: [
            'url?limit=10000&name=images/[hash:8].[name].[ext]',
            'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
          ]
        }
      ]
    },
    eslint: {
      configFile: path.join(__dirname, '../.eslintrc')
    },
    resolve: {
      extensions: ['', '.js', '.jsx','.scss','.css'],
      modulesDirectories: [
        "src", "node_modules"
      ]
    }
  }
];