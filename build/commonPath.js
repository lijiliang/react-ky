/**
 * @fileOverview commonPath 路径配置
 */
const path = require('path');
const rootPath = path.resolve(__dirname, '..');  //项目根目录
const src = path.join(rootPath, 'app');  // 开发源码目录

const commonPath = {
    rootPath: rootPath,
    src: src,  // 开发源码目录
    dist: path.join(rootPath, 'dist'),  // build后要输出的目录
    indexHTML: path.join(src, 'index.html'),  //入口文件
    staticDir: path.join(rootPath, 'static'),  //无需处理的静态资源目录
    env: process.env.NODE_ENV.trim(),  // 当前环境
};

module.exports = commonPath;
