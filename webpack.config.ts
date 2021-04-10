import * as webpack from "webpack";
import * as path from "path";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import VueLoaderPlugin from "vue-loader/dist/pluginWebpack5";

const config: webpack.Configuration = {
  mode: 'development',
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
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ]
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

export default config;