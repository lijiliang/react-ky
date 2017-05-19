/**
 * @fileOverview dev环境 构建配置
 */
const webpack = require('webpack');
const config = require('./webpack.base.conf');  // 引入公用配置
const commonPath = require('./commonPath');   // 路径配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const SOURCE_MAP = true;

// 配置config
config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';
config.devtool = SOURCE_MAP ? 'eval-source-map' : false;  //出错以后就会采用source-map的形式直接显示出错代码的位置
config.output.publicPath = '/';

// 添加热重载相关的代码
config.entry.app = [
    // 开启react代码的模块热替换（HMR）
    'react-hot-loader/patch',
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/only-dev-server',
    config.entry.app
];

// 开发环境下直接内嵌 CSS 以支持热替换
config.module.rules.push(
    {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: { importLoaders: 1 }
            },
            'postcss-loader',
            'less-loader',
        ]
    }
);

config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 开启全局的模块热替换（HMR）
    new webpack.HotModuleReplacementPlugin(),
    // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
    new webpack.NamedModulesPlugin(),
    // 提取 CSS 到单独的文件中
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
        template: commonPath.indexHTML,
        filename: 'index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',   //指定公共bundle名字
        minChunks: Infinity, // 随着 入口chunk 越来越多，这个配置保证没其它的模块会打包进 公共chunk
    }),
    new OpenBrowserPlugin({
        url: 'http://localhost:9002'
    })
    /*  如果react项目没有开启 module.hot 热加载的话，可以打开这里直接用浏览器代理直接刷新页面实现热加载
    new BrowserSyncPlugin({
        host: '127.0.0.1',
        port: 9092,
        proxy: 'http://127.0.0.1:9002/',
        logConnections: false,
        notify: false
    }, {
        // 防止sync自动加载页面，直接让webpack dev server 来处理
        reload: false
    })
    */
);
module.exports = config;
