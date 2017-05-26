/**
 * @fileOverview webpack构建流程，公用配置
 */
const path = require('path');
const webpack = require('webpack');
const commonPath = require('./commonPath');   // 路径配置
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const pxtorem = require('postcss-pxtorem');

const SvgStorePlugin = require('external-svg-sprite-loader/lib/SvgStorePlugin');
const svgDirs = [
    path.join(commonPath.src, '/base/resources/svg')    // 需要处理的svg存放目录
];

module.exports = {
    entry: {
        app: path.join(commonPath.src, 'app.js'),
        /**
         * [vendor 框架 / 类库 分离打包]
         */
        vendor: path.join(commonPath.src, 'vendor.js')
        // vendor: ['react', 'react-dom', 'history', 'lodash', 'redux', 'react-redux'],
    },
    output: {
        path: path.join(commonPath.dist, 'static'),
        // filename: '[name].js',
        publicPath: '/static/'
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx'],
        // resolve.alias 配置路径映射
        alias: {
            /**
             * 自定义路径别名
             */
            kyBase: path.join(commonPath.src, '/base/'),
            kyBus: path.join(commonPath.src, '/business/'),
            fetchData: path.join(commonPath.src, '/base/common/fetchData.js'),
            busModels: path.join(commonPath.src, '/business/modelIndex.js'),
            varLess: path.join(commonPath.src, '/base/resources/less/variables.less')   // less的一些变量
        }
    },
    // 模块 - 各种加载器
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [{
                    loader: 'react-hot-loader/webpack'
                },{
                    loader: 'babel-loader?cacheDirectory',
                    options: {
                        presets: [['es2015', {modules: false}], 'react', 'stage-0'],
                        plugins: ['transform-runtime', 'transform-decorators-legacy']
                    }
                }],
                exclude: /node_modules/,  // 优化babel 排除
                include: path.join(commonPath.src),   //优化babel 打包范围
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'link:href']
                    }
                }]
            },
            {
                // 匹配favicon.png
                test: /favicon\.png$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name]-[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.svg$/,
                loader: 'external-svg-sprite-loader',
                include: svgDirs,
            },
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-sprite-loader',
            //     include: svgDirs,   // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
            //     options: {
            //         runtimeCompat: true
            //     }
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                // 排除favicon.png, 因为它已经由上面的loader处理了. 如果不排除掉, 它会被这个loader再处理一遍
                exclude: /favicon\.png$/,
                query: {
                    limit: 4096, // 4KB 以下使用 base64
                    name: 'img/[name]-[hash:8].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 4096,
                    name: 'fonts/[name]-[hash:8].[ext]'
                }
            }
        ]
    },
    // 插件
    plugins: [
        // 进度条
        new NyanProgressPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // 自动加css前缀
        new webpack.LoaderOptionsPlugin({
            options : {
                postcss : function(){
                    return [
                        require('autoprefixer')({
                            // broswers : ['last 5 versions']
                            browsers: ['iOS >= 8','Android >= 4.1']
                        }),
                        // 将px转为rem
                        pxtorem({
                            rootValue: 100,
                            propWhiteList: [],
                        })
                    ];
                }
            }
        }),
        new webpack.DefinePlugin({
            'process.env': { // 这是给 React / Redux 打包用的
                NODE_ENV: JSON.stringify('production')
            },
            // ================================
            // 配置开发全局常量
            // ================================
            __DEV__: commonPath.env === 'development',
            __PROD__: commonPath.env === 'production'
        }),
        new SvgStorePlugin()
    ]
};
