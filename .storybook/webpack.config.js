const path = require('path');

module.exports = {
  resolve: {
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        loaders: ["style-loader", "css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]'", "sass-loader"],
      },{
        test: /\.md$/,
        use: "raw-loader"
      }
    ]
  }
};
