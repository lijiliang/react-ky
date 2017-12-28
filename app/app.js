/**
 * @fileOverview H5端入口文件
 */
import React from 'react';
import { render } from 'react-dom';
import FastClick from 'fastclick';
// 引入路由配置
import RouterConfig from 'kyBase/router/RouterConfig';

//解决移动端300毫秒延迟
FastClick.attach(document.body);

// 手机调试工具，仅做调试用。正式环境需要手动隐藏
// import VConsole from 'vconsole';
// var vConsole = new VConsole();

render(
    <RouterConfig />,
    document.getElementById('root-container')
);
