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

import vconsole from 'vconsole';
console.log('a')

render(
    <RouterConfig />,
    document.getElementById('root-container')
);
