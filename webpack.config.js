var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

var config = {
  context: __dirname + "/src",
  devtool: debug ? "inline-sourcemap" : null,

  entry: './client/app/index.jsx',
  output: {
    path: __dirname + "/src/client/public",
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      }
    ]
  },

  plugins: debug ?[] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OcurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false}),
  ]
};

module.exports = config;
