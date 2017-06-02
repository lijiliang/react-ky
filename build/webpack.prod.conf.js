/**
 * @fileOverview 生产环境 构建配置
 */
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.base.conf');
const commonPath = require('./commonPath');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const tinyPngWebpackPlugin = require('tinypng-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');  // 用于清理目录文件
const SOURCE_MAP = false;

// 环境变量获取方法  process.env.NODE_ENV

// 配置config
config.output.filename = '[name].[chunkhash:8].js';
config.output.chunkFilename = '[id].[chunkhash:8].js';
config.devtool = SOURCE_MAP ? 'source-map' : false;

config.module.rules.push(
    {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        minimize: true
                    }
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'less-loader'
                }
            ]
        })
    }
);

// webpack插件配置
config.plugins.push(
    new CleanWebpackPlugin(['dist'], {   // 清空生成目录
        root: path.resolve(__dirname, '..'),
        verbose: true,
        dry: false,
    }),
    // 删除重复数据
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    // 压缩JS
    new webpack.optimize.UglifyJsPlugin({
        // 最紧凑的输出
        beautify: false,
        // 删除所有的注释
        comments: false,
        compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 构建优化插件
    new webpack.optimize.CommonsChunkPlugin({
        // 公共代码分离打包
        names: ['vendor'],
        minChunks: Infinity
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 30000
    }),
    // 提取 CSS 到单独的文件中
    new ExtractTextPlugin({
        filename: '[name].[contenthash:8].css'
    }),
    // 生成文件hash对应的map文件
    new AssetsPlugin({
        filename: 'assetsMap.json',
        path: commonPath.dist
    }),
    new HtmlWebpackPlugin({
        filename: '../index.html',
        template: commonPath.indexHTML
    }),
    new webpack.DefinePlugin({
        // 开发环境变量
        __environment__ : '"prod"'
    })
    // 图片压缩
    /*
    new ImageminPlugin({
        pngquant: {
            quality: '90-100'
        },
        optipng: {
            optimizationLevel: 5
        }
    }),

    */
    // 利用tinypng 进行图片压缩，要用到key,每个月才能压缩500张 https://tinypng.com/developers
    /*
    new tinyPngWebpackPlugin({
        key:'OLord53OFESyRWh1XYGBrUhoQIkKYd9R',
        relativePath: commonPath.dist + '/static/img/' // 文件的输出路径
    })
    */
);
module.exports = config;
