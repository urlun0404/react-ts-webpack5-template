const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    // bundle: path.resolve(__dirname, 'src/index.html'),
    bundle: path.resolve(__dirname, 'src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contentHash].js',
    clean: true,
    assetModuleName: '[name][ext]',
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: '/node-modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)/,
        type: 'asset/resource,',
        generator: {
          publicPath: '/src/assets/images',
          output: 'assets/images',
        },
      },
    ],
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
};
