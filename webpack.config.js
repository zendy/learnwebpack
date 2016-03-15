const path = require('path');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist')
};

module.exports = {
  entry: PATHS.app,
  output: {
    filename: 'bundle.js',
    path: PATHS.dist
  },
  devServer: {
    contentBase: PATHS.dist,
    port: 8080,
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need something
        // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
        loader: 'babel',
        // Parse only app files! Without this it will go through entire project.
        // In addition to being slow, that will most likely result in an error.
        include: PATHS.app,
        query: {
          presets: 'es2015'
        }
      }
    ]
  }
};
