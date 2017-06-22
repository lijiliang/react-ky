/**
 * @fileOverview  Drawer 抽屉, 用于屏幕边缘显示应用导航
 */

import React from 'react';
import RcDrawer from 'rc-drawer';
import PropTypes from 'prop-types';

import './Drawer.less';

export default class Drawer extends React.Component {
    static defaultProps = {
        prefixCls: 'ky-drawer',
        enableDragHandle: false,
    };

    render(){
        return <RcDrawer {...this.props} />;
    }
}

Drawer.propTypes = {
    sidebar: PropTypes.element,  //抽屉里的内容
    sidebarStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    overlayStyle: PropTypes.object,
    dragHandleStyle: PropTypes.object,
    children: PropTypes.element,
    open: PropTypes.bool,      //开关状态
    position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    docked: PropTypes.bool,
    transitions: PropTypes.bool,
    touch: PropTypes.bool,
    dragToggleDistance: PropTypes.number, //打开关闭抽屉时距 sidebar 的拖动距离
    prefixCls: PropTypes.string,
    onOpenChange: PropTypes.func,
    drawerWidth: PropTypes.number,           //抽屉宽度
    drawerBackgroundColor: PropTypes.string, //指定抽屉背景色
}
