import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: "development",
    entry: "./client/index.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js",
        publicPath: "/",
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./client/index.html"
        })
    ],
    devServer: {
        static: {
            publicPath: '/build',
            directory: path.resolve(__dirname, 'build')
        },
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/graphql':"http://localhost:3000"
        }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options:{
              presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        {
          test:/\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto",
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'assets'
            }
          }
          ]
        }
      ]
    }
}

