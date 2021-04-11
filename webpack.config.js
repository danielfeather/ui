const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: "asset/resource"
      },
      {
        test: /\.svg$/,
        type: "asset/inline"
      }
    ]
  },
  resolve: {
    extensions: ['.vue', '.ts'],
    alias: {
      vue$: "vue/dist/vue.runtime.esm-bundler.js"
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin()
  ]
}

module.exports = config;