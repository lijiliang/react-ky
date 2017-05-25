/**
 * @fileOverview 按钮组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './Button.less';

class Button extends React.Component{
    static defaultProps = {
        prefixCls: 'ky-button',   // class前缀
        size: 'large',            // 按钮大小，可选值为large、small
        disabled: false,          // 是否禁用
        inline: false,            // 是否内联
        across: false,            // 是否设置为通栏展示
    };
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        };
    }
    render(){
        const { title, className, prefixCls, disabled, inline, size, across, type, onClick, ...restProps} = this.props;

        console.log(this.props)

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
            <button
                className={classNames(wrapCls)}
                {...restProps}
                onClick={disabled ? undefined : onClick}
                >
                {title}
            </button>
        );
    }
}

export default Button;
