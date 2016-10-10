var path = require('path');
var express = require('express');
var serverRender = require('./dist/render.js');

const app = express();
const port = 3000;
var isDev = process.env.NODE_ENV === 'development';
app.use(express.static(path.join(__dirname, 'dist')));

if(isDev){
  var config = require('./webpack/webpack.dev.config.js');
  var compiler = require('webpack')(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    hot: true,
    inline: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}else{
  app.set('views', path.join(__dirname, 'dist'));
}

app.use(function(req, res) {
  serverRender.default(req, res);
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});