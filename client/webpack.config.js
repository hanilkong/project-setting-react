const HTMLWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const dotenv = require('dotenv')
const crypto = require('crypto')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin")
const childProcess = require("child_process")

const prod = process.env.NODE_ENV === 'production'
dotenv.config({ path: path.join(__dirname, `../environments/.env.${process.env.NODE_ENV}`) })

const commit = childProcess.execSync("git rev-parse --short HEAD")
const user = childProcess.execSync("git config user.name")
const date = new Date().toLocaleString()
const banner = `commitVersion: ${commit}` + `Build Date: ${date}\n` + `Author: ${user}`

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? 'hidden-source-map' : 'eval-cheap-source-map',
  entry: './src/index.tsx',
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    proxy: {}
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webm)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[id].[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      // chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|react-router-dom|lodash-es|date-fns)[\\/]/,
          priority: 40,
          enforce: true,
        },
        module: {
          chunks: 'all',
          name: 'module',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/](swiper|recoil)[\\/]/,
          priority: 40,
          enforce: true,
        },
        lib: {
          test(module) {
            return (
              module.size() > 40000 &&
              /node_modules[/\\]/.test(module.identifier())
            );
          },
          name(module) {
            const hash = crypto.createHash('sha1');
      
            hash.update(module.libIdent({ context: __dirname }));
      
            return hash.digest('hex').substring(0, 8);
          },
          priority: 30,
          minChunks: 1,
          reuseExistingChunk: true,
        },
        commons: {
          name: 'commons',
          minChunks: 1, // entry points length
          priority: 20,
        }
      }
    },
    minimize: false,
    minimizer: prod === 'production' ? [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 콘솔 로그를 제거한다
            warnings: false,
            inline: 2,
          }
        }
      })
    ]: []
  },
  plugins: [
    // 이번 빌드 파일 제거
    new CleanWebpackPlugin(),
    // html 푸알 후처리
    new HTMLWebpackPlugin({
      minify: prod === true ? {collapseWhitespace: true, removeComments: true }: false,
      template: './public/index.html',
      filename: './index.html',
      // favicon: './public/favicon.ico'
    }),
    // 환경 정보
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    // build파일에 주석 추가
    // new webpack.BannerPlugin(banner),
    // manifest 생성
    new WebpackManifestPlugin({
      fileName: 'assets.json',
      basePath: '/'
    }),

    // 빌드시 압축
    new CompressionPlugin({
      // asset: "[path].gz[query]",
      // algorithm: "gzip",
      // test: /\.(js|html)$/,
      // threshold: 10240, // 10kb
      // minRatio: 0.8
    }),
    // 번들 사이즈 체크
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   reportTitle: 'bundle-report',
    //   reportFilename: 'bundle-report.html',
    //   openAnalyzer: false,
    //   generateStatsFile: true,
    //   statsFilename: 'bundle-stats.json'
    // }),
  ],
}
