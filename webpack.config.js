const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: ['./client/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath:'/'
    },
    port: 8080,
    hot: true,
    proxy: {
    '/api/*': 'http://localhost:3000'
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/preset-env",
             ["@babel/preset-react", {"runtime": "automatic"}]
          ]
          }
        }
      },
      {
        test: /.(css|scss)$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.(png|jep?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}