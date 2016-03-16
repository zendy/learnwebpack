const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer-core');

const release = (process.env.NODE_ENV === 'production');
const localIdentName = release ? '_[hash:base64:5]' : '[path][name]---[local]---[hash:base64:5]';

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist')
};

const entry = {
  app: PATHS.app,
}

const plugins = [
  new ExtractTextPlugin('bundle.css', {
    relaxInvalidOrder: true,
  }),
  new webpack.HotModuleReplacementPlugin()
];

module.exports = {
  entry: entry,
  // Add resolve.extensions.
  // '' is needed to allow imports without an extension.
  // Note the .'s before extensions as it will fail to match without!!!
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  output: {
    filename: 'bundle.js',
    path: PATHS.dist
  },
  devServer: {
    contentBase: PATHS.dist,
    port: 8080,
    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
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
          cacheDirectory: true,
          presets: [ 'react', 'es2015' ]
        }
      },
      {
        // Test expects a RegExp! Note the slashes!
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?sourceMap&-minimize&modules&localIdentName='+localIdentName+'&importLoaders=1!postcss-loader'),
        // Include accepts either a path or an array of paths.
        include: PATHS.app,
      }
    ]
  },
  plugins: plugins,
  postcss: [
    autoprefixer({ browsers: ['last 3 versions'] }),
  ],
};
