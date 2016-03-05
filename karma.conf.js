var path = require('path')
var webpackConfig = require('./webpack.config')
module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: ['test/**/test-*'],
    preprocessors: {
      'test/**/test-*': ['webpack', 'sourcemap']
    },
    webpack: Object.assign(webpackConfig, {
      devtool: 'inline-source-map',
      watch: true,
      module: {
        preLoaders: [{
          test: /\.js$/,
          exclude: [path.resolve('node_modules/')],
          loader: 'babel'
        }, {
          test: /\.js$/,
          include: [path.resolve('components/'), path.resolve('lib/')],
          loader: 'isparta'
        }]
      }
    }),
    webpackServer: {
      quiet: true,
      noInfo: true
    },
    browsers: ['Chrome'],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'html', dir: 'coverage' },
        { type: 'text' }
      ]
    }
  })
}
