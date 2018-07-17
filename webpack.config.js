const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src/docs"),
  output: {
    path: path.join(__dirname, "docs"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff"
            }
        }
      }, 
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff"
            }
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/octet-stream"
            }
        }
      }, 
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "image/svg+xml"
            }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/docs/index.html")
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    port: 8000,
    stats: "minimal"
  }
};
