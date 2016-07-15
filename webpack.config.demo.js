'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {

  devtool: 'eval',

  entry: {
    demo: ['webpack/hot/dev-server', './demo/index.jsx']
  },

  module: {
    loaders: [
      { test: /.js$/, loader: 'babel?stage=0', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel?stage=0', exclude: /node_modules/ },
      // SINCE XLSX library pre-dates npm, it is not very npm friendly.
      // Thus requiring it through regular import will break the build. The work
      // around was to use the script-loader to ignore the dependency checks
      // THIS ONLY applies to the XLSX library.
      {
        test: /xlsx\.core\.min\.js$/,
        include: /(node_modules|bower_components)/,
        loader: 'script'
      }
    ],
  },

  output: {
    filename: 'demo/bundle.js'
  },

  resolve: {
    extensions: ['', '.jsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: './demo'
  }

};
