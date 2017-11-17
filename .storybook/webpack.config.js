const path = require('path');
const merge = require('webpack-merge');

module.exports = (storybookBaseConfig, configType) => {

  const config = merge(storybookBaseConfig, {
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
  });

  config.plugins = storybookBaseConfig.plugins.filter(plugin => plugin.constructor.name !== 'UglifyJsPlugin');

  return config;
};
