const path = require('path');

module.exports = {
  resolve: {
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
      },{
        test: /\.md$/,
        use: "raw-loader"
      }
    ]
  }
};
