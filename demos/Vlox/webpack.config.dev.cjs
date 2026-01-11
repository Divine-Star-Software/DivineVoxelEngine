const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve("debug"),
    publicPath: "/",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./src/tsconfig.json",
        extensions: [".ts", ".tsx", ".js", ".css"],
      }),
    ],
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.wasm$/,
        type: "webassembly/async", // Use 'webassembly/sync' for synchronous modules
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compiler: "typescript",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(js|jsx)$/,

        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    port: 9002,

    server: "https",
    static: {
      directory: path.join(__dirname, "../../static"),
      publicPath: "/",
    },
    liveReload: true,
    open: true,
    hot: true,
    watchFiles: [path.join(__dirname, "src/**/*")],
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
};
