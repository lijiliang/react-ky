/**
 * @fileOverview List列表 单项
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Touchable from 'rc-touchable';
import omit from 'omit.js';

export class Biref extends React.Component {
    render(){
        return(
            <div className="ky-list-brief" style={this.props.style}>{this.props.children}</div>
        );
    }
}
Biref.propTypes = {
    style: PropTypes.object,
    children: PropTypes.element,
    wrap: PropTypes.bool
}

class ListItem extends React.Component {
    static defaultProps = {
        prefixCls: 'ky-list',
        align: 'middle',
        error: false,
        multipleLine: false,
        wrap: false,
        platform: 'cross'
    };

    static Brief = Biref;
    debounceTimeout: null;

    constructor(props) {
        super(props);
        this.state = {
            coverRippleStyle: { display: 'none' },
            RippleClicked: false,
        }
    }
    componentWillUnmount() {
   if (this.debounceTimeout) {
     clearTimeout(this.debounceTimeout);
     this.debounceTimeout = null;
   }
 }
 onClick = (ev) => {
     // 设置了Click事件会有material水波纹点击效果
    const { onClick, platform } = this.props;
    const isAndroid = platform === 'android' || (platform === 'cross' && !!navigator.userAgent.match(/Android/i));
    if (!!onClick && isAndroid) {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = null;
      }
      let Item = ev.currentTarget;
      let RippleWidth = Math.max(Item.offsetHeight, Item.offsetWidth);
      const ClientRect = ev.currentTarget.getBoundingClientRect();
      let pointX = ev.clientX - ClientRect.left - Item.offsetWidth / 2;
      let pointY = ev.clientY - ClientRect.top - Item.offsetWidth / 2;
      const coverRippleStyle = {
        width: `${RippleWidth}px`,
        height: `${RippleWidth}px`,
        left: `${pointX}px`,
        top: `${pointY}px`,
      };
      this.setState({
        coverRippleStyle,
        RippleClicked: true,
      }, () => {
        this.debounceTimeout = setTimeout(() => {
          this.setState({
            coverRippleStyle: { display: 'none' },
            RippleClicked: false,
          });
        }, 1000);
      });
    }

    if (onClick) {
      onClick(ev);
    }
  }
    render(){
        const {
            prefixCls, className, activeStyle, error, align, wrap, disabled,
            children, multipleLine, thumb, extra, arrow, onClick, ...restProps } = this.props;
        const { coverRippleStyle, RippleClicked } = this.state;

        // 默认类
        const wrapCls = {
            [className]: className,
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-item-disabled`]: disabled,
            [`${prefixCls}-item-error`]: error,
            [`${prefixCls}-item-top`] : align === 'top',
            [`${prefixCls}-item-middle`] : align === 'middle',
            [`${prefixCls}-item-bottom`] : align === 'bottom',
        }
        const rippleCls = classNames({
            [`${prefixCls}-ripple`]: true,
            [`${prefixCls}-ripple-animate`]: RippleClicked,
        })

        // 是否多行
        const lineCls = classNames({
            [`${prefixCls}-line`]: true,
            [`${prefixCls}-line-multiple`]: multipleLine,
            [`${prefixCls}-line-wrap`]: wrap,
        })

        const arrowCls = classNames({
            [`${prefixCls}-arrow`]: true,
            [`${prefixCls}-arrow-horizontal`]: arrow === 'horizontal',
            [`${prefixCls}-arrow-vertical`]: arrow === 'down' || arrow === 'up',
            [`${prefixCls}-arrow-vertical-up`]: arrow === 'up',
        })

        // 主体内容
        const content = <div
            {...omit(restProps, ['platform'])}
            onClick={(ev) => {
                this.onClick(ev);
            }}
            className={classNames(wrapCls)}
        >
            {thumb ? <div className={`${prefixCls}-thumb`}>
                {typeof thumb === 'string' ? <img src={thumb} /> : thumb}
            </div> : null}
            <div className={lineCls}>
                {children !== undefined && <div className={`${prefixCls}-content`}>{children}</div>}
                {extra !== undefined && <div className={`${prefixCls}-extra`}>{extra}</div>}
                {arrow && <div className={arrowCls}/>}
            </div>
            <div style={coverRippleStyle} className={rippleCls} />
        </div>;

        return(
            <Touchable
                disabled={disabled || !onClick}
                activeStyle={activeStyle}
                activeClassName={`${prefixCls}-item-active`}
            >
                {content}
             </Touchable>
        );
    }
}
ListItem.propTypes = {
    thumb: PropTypes.element,
    extra: PropTypes.element,
    arrow: PropTypes.oneOf(['horizontal', 'down', 'up', 'empty']),
    align: PropTypes.oneOf(['top', 'middle', 'bottom']),
    onClick: PropTypes.func,
    multipleLine: PropTypes.bool,
    error: PropTypes.bool,
    wrap: PropTypes.bool,
    activeStyle: PropTypes.object,
    platform: PropTypes.oneOf(['android', 'ios', 'cross']),
}
export default ListItem;
