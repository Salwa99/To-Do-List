// Webpack uses this to work with directories
const path = require('path');
const  HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

  entry: {
    index: path.resolve(__dirname, './src/index.js')

  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },

  plugins: [
    new  HtmlWebpackPlugin ({
        template: path.resolve(__dirname, './src/index.html')
    })
],

module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
    
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8081,
  },

  mode: 'development'

};