const path = require('path');
const merge = require('webpack-merge');

module.exports = ({ config, mode }) => ({
  ...config,
  resolve: {
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
      },
    ],
  },
  plugins: config.plugins.filter(plugin => plugin.constructor.name !== 'UglifyJsPlugin'),
});
