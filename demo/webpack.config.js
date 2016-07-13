var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, './demo.js')
  ],
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: path.join(__dirname, '..')
      },
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        include: path.join(__dirname, '..')
      }
    ]
  }
}
