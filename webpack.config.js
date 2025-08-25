const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'bundle.[contenthash].js' : 'bundle.js',
      clean: true,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
          ]
        },
        {
          test: /\.svg$/i,
          oneOf: [
            {
              resourceQuery: /url/,
              type: 'asset/resource'
            },
            {
              issuer: /\.[jt]sx?$/,
              use: [
                {
                  loader: '@svgr/webpack',
                  options: {
                    svgo: true,
                    svgoConfig: {
                      plugins: [
                        { name: 'removeViewBox', active: false }
                      ]
                    },
                    exportType: 'default'
                  }
                }
              ]
            },
            {
              type: 'asset/resource'
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource'
        }
      ]
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      historyApiFallback: true,
      port: 3000,
      open: true,
      hot: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
      }),
      new webpack.DefinePlugin({
        APP_VERSION: JSON.stringify(pkg.version)
      }),
      new CopyPlugin({
        patterns: [
          { 
            from: 'public', 
            to: '.', 
            globOptions: { ignore: ['**/index.html'] } 
          }
        ]
      })
    ],
    devtool: isProd ? false : 'source-map',
    performance: isProd ? {
      maxAssetSize: 6 * 1024 * 1024,
      maxEntrypointSize: 6 * 1024 * 1024,
      hints: 'warning',
    } : false,
  };
};
