/**
 * @fileOverview Loading 指示， 表明某个任务正在进行中
 */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Loading.less';

export default class Loading extends React.Component {
    static defaultProps = {
        prefixCls: 'ky-loading',
        animating: true,
        size: 'small',
        panelColor: 'rgba(34,34,34,0.6)',
        toast: false
    }
    render() {
        const { prefixCls, className, animating, toast, size, text } = this.props;
        const wrapClass = classNames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-lg`]: size === 'large',
            [`${prefixCls}-sm`]: size === 'small',
            [className]: !!className,
            [`${prefixCls}-toast`]: !!toast,
        })
        const spinnerClass = classNames({
            [`${prefixCls}-spinner`]: true,
            [`${prefixCls}-spinner-lg`]: !!toast || size === 'large',
        });
        if(animating){
            if(toast) {
                return (
                    <div className={wrapClass}>
                        {
                            text ? (
                            <div className={`${prefixCls}-content`}>
                                <span className={spinnerClass}/>
                                <span className={`${prefixCls}-toast`}>{text}</span>
                            </div>
                            ) : (
                            <div className={`${prefixCls}-content`}>
                                <span className={spinnerClass}/>
                            </div>
                            )
                        }
                    </div>
                )
            }else{
                return text ? (
                    <div className={wrapClass}>
                        <span className={spinnerClass}/>
                        <span className={`${prefixCls}-tip`}>{text}</span>
                    </div>
                    ) : (
                    <div className={wrapClass}>
                        <span className={spinnerClass}/>
                    </div>
                );
            }
        } else {
            return null;
        }
    }
}

Loading.propTypes = {
    animating: PropTypes.bool,   // 显隐状态
    size: PropTypes.oneOf(['small', 'large']),  //spinner大小，可选small/large
    toast: PropTypes.bool,  // loading样式类型
    text: PropTypes.string, // loading文本
    color: PropTypes.string // 	spinner颜色
};
