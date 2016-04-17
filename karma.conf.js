var path = require('path')
var webpackConfig = require('./webpack.config')
webpackConfig.module.loaders.push({
  test: /\.js$/,
  include: [path.resolve('components/'), path.resolve('lib/')],
  loader: 'isparta'
})
module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [ 'test/test-*' ],
    preprocessors: { '/**/*.js': ['webpack', 'sourcemap'] },
    webpack: webpackConfig,
    webpackServer: {
      quiet: true,
      noInfo: true
    },
    browsers: ['Chrome'],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      reporters: [
        // { type: 'html', dir: 'coverage' },
        { type: 'text' }
      ]
    }
  })
}
