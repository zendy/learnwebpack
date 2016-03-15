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
    contentBase: PATHS.join,
    port: 8080,
  }
};
