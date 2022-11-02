const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    // bundle: path.resolve(__dirname, 'src/index.html'),
    bundle: path.resolve(__dirname, '../src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contentHash].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
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
        test: /\.(?:ico|jpe?g|png|gif)$/,
        type: 'asset/resource',
        generator: {
          publicPath: 'assets/images/',
          outputPath: 'assets/images/',
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
        generator: {
          publicPath: 'assets/images/',
          outputPath: 'assets/images/',
        },
      },
      {
        test: /\.(wott(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
        generator: {
          publicPath: 'assets/fonts/',
          outputPath: 'assets/fonts/',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../'),
      '@types': path.resolve(__dirname, '../types'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@images': path.resolve(__dirname, '../src/assets/images'),
    },
  },
};
