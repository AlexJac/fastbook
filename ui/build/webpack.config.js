'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const production = process.env.NODE_ENV === 'production'
const development = process.env.NODE_ENV === 'development'
const testing = process.env.NODE_ENV === 'testing'

const target = 'web'
const externals = []

const devtool = production ? 'source-map' : 'cheap-module-source-map'

const hotEntry =
  development
    ? ['eventsource-polyfill', 'webpack-hot-middleware/client']
    : []

const entry = {
  app: [
    ...hotEntry,
    path.resolve(__dirname, '../src/app/app.module.js')
  ]
}

const output = {
  filename: '[name].js',
  path: path.resolve(__dirname, '../../src/main/webapp/bundled'),
  publicPath: '/bundled/'
}

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'PROD': production,
    'DEV': development,
    'TEST': testing
  }),
  new ExtractTextPlugin('[name].css', {
    allChunks: true
  }),
  ...(development ? [
    new webpack.HotModuleReplacementPlugin()
  ] : []),
  ...(production ? [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [])
]

const resolve = {
  extensions: ['', '.js', '.css', '.html'],
  modulesDirectories: [
    'node_modules',
    'lib',
    'assets'
  ]
}

const loaders = [{
  // js loading
  test: /\.js$/,
  include: path.resolve(__dirname, '../src'),
  exclude: /node_modules/,
  loaders: ['babel']
}, {
  // sass and css loading (with css modules)
  test: /\.css$/,
  include: [
    path.resolve(__dirname, '../src'),
    /node_modules/
  ],
  loaders: [
    'style',
    ExtractTextPlugin.extract(['css?minimize&sourceMap'])
  ]
}, {
  // asset loading as url/data:url
  test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico|json)$/,
  include: path.resolve(__dirname, '../src'),
  exclude: /node_modules/,
  loaders: ['url?limit=10000&name=[path][name].[ext]?[hash]']
}, {
  // html loading with angular template caching
  test: /\.html$/,
  include: path.resolve(__dirname, '../src'),
  exclude: /node_modules/,
  loaders: ['ngtemplate', 'html?interpolate'] // query params pass options to loaders
}]

module.exports = {
  target,
  externals,
  devtool,
  entry,
  output,
  plugins,
  resolve,
  module: {
    loaders
  }
}
