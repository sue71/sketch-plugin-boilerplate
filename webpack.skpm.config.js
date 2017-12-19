const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WebpackDefinePlugin = webpack.DefinePlugin;

/**
 * Webpack Config
 */
module.exports = config => {
  config.resolve.extensions = ['.js', '.jsx'];

  config.module.rules.push({
    test: /\.html$/,
    loader: 'file-loader?name=[name].[ext]'
  });

  config.module.rules.push({
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader'
      }
    ]
  });

  config.plugins.push(
    new WebpackDefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  );

};
