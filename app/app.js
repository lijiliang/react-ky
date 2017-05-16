/**
 * @fileOverview H5端入口文件
 */
import React from 'react';
import { render } from 'react-dom';

// 引入路由配置
import RouterConfig from 'kyBase/router/RouterConfig';

render(
    <RouterConfig />,
    document.getElementById('root')
);
