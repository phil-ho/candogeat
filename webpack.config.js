const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: "http://localhost:8080/dist/",
  },
};
