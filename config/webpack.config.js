const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;
const ROOT_DIRECTORY = path.join(__dirname, '..');
const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, 'src');

const basePath = ROOT_DIRECTORY + '/.env';
const envPath = basePath + '.' + env.ENVIRONMENT;
const finalPath = fs.existsSync(envPath) ? envPath : basePath;
const fileEnv = dotenv.config({ path: finalPath }).parsed;

const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
  return prev;
}, {});

const config = {
  entry: [path.resolve(__dirname, '../src/index.js')],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  resolve: {
    modules: [path.resolve('node_modules'), 'node_modules']
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIRECTORY, 'index.html')
    }),
    new webpack.DefinePlugin(envKeys)
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};

module.exports = config;
