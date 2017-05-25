/**
 * @fileOverview 按钮组件
 *
 * 使用举例：
 <Button className="ky-btn" title="登录" type="primary"/>
 <Button className="ky-btn" title="可点击" onClick={e => console.log(e)}/>
 <Button title="会员注册" />
 <Button title="自定义样式" style={{ fontSize: '0.26rem' }}/>
 <Button title="disabled" disabled onClick={e => console.log(e)}/>
 <Button title="inline" inline onClick={e => console.log(e)}/>
 <Button title="通栏(没圆角和边框)" disabled across/>
 <Button title="大尺寸" size="large"/>
 <Button title="小尺寸" size="small"/>
 <Button title="点击无反馈" activeStyle={false}/>
 <Button title="自定义点击反馈" activeStyle={{ backgroundColor: 'red' }}/>
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Touchable from 'rc-touchable';

import './Button.less';

class Button extends React.Component{
    static defaultProps = {
        prefixCls: 'ky-button',   // class前缀
        size: 'large',            // 按钮大小，可选值为large、small
        disabled: false,          // 是否禁用
        inline: false,            // 是否内联
        across: false,            // 是否设置为通栏展示
        activeStyle: {},          // 点击反馈的自定义样式 (设为 false 时表示禁止点击反馈)
    };
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        const { title, className, prefixCls, disabled, inline, size, across, type, activeStyle, onClick, ...restProps} = this.props;

        const wrapCls = {
            [className]: className,
            [prefixCls]: true,
            [`${prefixCls}-primary`]: type === 'primary',
            [`${prefixCls}-small`]: size === 'small',
            [`${prefixCls}-inline`]: inline,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-across`]: across,
        }
        return(
            <Touchable
                activeClassName={activeStyle ? `${prefixCls}-active` : undefined}
                disabled={disabled}
                activeStyle={activeStyle}
            >
                <button
                    className={classNames(wrapCls)}
                    {...restProps}
                    onClick={disabled ? undefined : onClick}
                    >
                    {title}
                </button>
            </Touchable>
        );
    }
}

export default Button;
