const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: "production",
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, "server/views/layout"),
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.scss?$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }, {
        test: /\.(png|jpg)$/i,
        use:[
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/',
              publicPath: '/'
            }
          }
        ],
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'static' }]),
    new CleanWebpackPlugin('server/views/layout', {}),
    new ExtractTextPlugin({ filename: 'style.[chunkhash].css' }),
    new HtmlWebpackPlugin({
      
      head:"<%- block('head').toString() %>",
      body:'<%- body %>',
      footer:"<%- block('footer').toString() %>",
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.ejs',
    })
  ]
};
