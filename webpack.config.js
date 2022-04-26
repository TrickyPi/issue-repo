const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const isBuild = true;

module.exports = {
  mode: isBuild ? "production" : "development",
  entry: "./src/index.jsx",
  resolve: {
    extensions: [".jsx", ".js"],
  },
  output: {
    filename: isBuild
      ? "static/js/[name].[contenthash:8].js"
      : "static/js/[name].bundle.js",
    chunkFilename: isBuild
      ? "static/js/[name].[contenthash:8].chunk.js"
      : "static/js/[name].chunk.js",
    path: path.resolve("dist"),
    publicPath: "/",
    clean: true,
    library: {
      name: "packageName",
      type: "umd",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [require.resolve("css-loader")],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          require.resolve("css-loader"),
          {
            loader: require.resolve("less-loader"),
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  "root-entry-name": "variable",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              presets: [
                [
                  require.resolve("@babel/preset-env"),
                  {
                    useBuiltIns: "entry",
                    corejs: 3,
                  },
                ],
                [
                  require.resolve("@babel/preset-react"),
                  {
                    runtime: "automatic",
                  },
                ],
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.(bmp|png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "static/img/[hash][ext][query]",
        },
      },
    ].filter(Boolean),
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "public/index.html",
    }),
    isBuild &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
      }),
  ].filter(Boolean),
};
