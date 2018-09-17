/**
 * @fileOverview 生产环境构建
 */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const commonPath = require('./commonPath');
const webpackProd = require('./webpack.beta.conf');

webpack(webpackProd, function(err, stats){
    // 打印build信息
    console.log(stats.toString({ chunks: false, color: true }));

    // 保存build信息到build_info
    fs.writeFile(
        path.join(commonPath.dist, 'build_info'),
        stats.toString({ color: false })
    );
});
