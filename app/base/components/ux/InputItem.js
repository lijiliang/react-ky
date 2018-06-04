/**
 * @fileOverview: InputItem 文本输入
 */
import React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import Input from './Input';
import './InputItem.less';

function noop() {}

function fixControlledValue(value) {
    if(typeof value === 'undefined' || value === null){
        return '';
    }
    return value;
}

const bfscrolltop = document.body.scrollTop;//获取软键盘唤起前浏览器滚动部分的高度
class InputItem extends React.Component {
    static defaultProps = {
        prefixCls: 'ky-input',
        prefixListCls: 'ky-list',
        type: 'text',
        editable: true,
        desabled: false,
        placeholder: '',
        clear:false,
        onChange: noop,
        onBlur: noop,
        onFocus: noop,
        extra: '',
        onExtraClick: noop,
        error: false,
        onErrorClick: noop,
        labelNumber: 6,
        updatePlaceholder: false
    };

    debounceTimeout: null;

    constructor(props) {
        super(props);
        this.state = {
            placeholder: props.placeholder,
            isShowPwd: false,   // 是否显示密码
        };
    }

    // 更新状态
    componentWillReceiveProps(nextProps) {
        if ('placeholder' in nextProps && !nextProps.updatePlaceholder) {
            this.setState({
                placeholder: nextProps.placeholder,
            });
        }
    }

    //卸载组件
    componentWillUnmount() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
    }
    // change 事件触发的回调函数
    onInputChange = (e) => {
        let value = e.target.value;

        const { onChange, type } = this.props;

        switch (type) {
            case 'text':
            break;
        case 'bankCard':
            value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
            break;
        case 'phone':
            value = value.replace(/\D/g, '').substring(0, 11);
            const valueLen = value.length;
            if (valueLen > 3 && valueLen < 8) {
                value = `${value.substr(0, 3)} ${value.substr(3)}`;
            } else if (valueLen >= 8) {
                value = `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(7)}`;
            }
            break;
        case 'number':
            value = value.replace(/\D/g, '');
            break;
        case 'password':
            break;
        default:
            break;
        }

        if (onChange) {
            onChange(value);
        }
    }

    // focus 事件触发的回调函数
    onInputFocus = (value) => {
        if(this.debounceTimeout) {
            document.activeElement.scrollIntoViewIfNeeded();
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
        this.setState({
            focus: true,
        });
        if(this.props.onFocus){
            this.props.onFocus(value);
        }
    }
    // blur 事件触发的回调函数
    onInputBlur = (value) => {
        this.debounceTimeout = setTimeout(() => {
            this.setState({
                focus: false,
            });
        }, 200);
        if (this.props.onBlur) {
            this.props.onBlur(value);
        }
    }

    // 点击报错 icon 触发的回调函数
    onErrorClick = (e) => {
        if (this.props.onErrorClick) {
            this.props.onErrorClick(e);
        }
    }

    // extra 点击事件触发的回调函数
    onExtraClick = (e) => {
        // 处理显示密码
        if(this.props.showPwd && this.props.onExtraClick){
            this.setState({
                isShowPwd: !this.state.isShowPwd
            })
        }
        if (this.props.onExtraClick){
            this.props.onExtraClick(e);
        }
    }

    clearInput = () => {
        if (this.props.type !== 'password' && this.props.updatePlaceholder) {
            this.setState({
                placeholder: this.props.value,
            });
        }
        if (this.props.onChange) {
            this.props.onChange('');
        }
    }

    render(){
        const {
          prefixCls, prefixListCls, type, value, defaultValue,
          name, editable, disabled, style, clear, children,
          error, className, extra, labelNumber, maxLength, showPwd
        } = this.props;

        const otherProps = omit(this.props, ['prefixCls', 'prefixListCls', 'editable', 'style',
          'clear', 'children', 'error', 'className', 'extra', 'labelNumber', 'onExtraClick', 'onErrorClick',
          'updatePlaceholder', 'placeholderTextColor', 'type', 'showPwd',
        ]);

        const { placeholder, focus } = this.state;
        // 默认类名
        const wrapCls = classNames({
            [`${prefixListCls}-item`]: true,
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-error`]: error,
            [`${prefixCls}-focus`]: focus,
            [`${prefixCls}-android`]: focus,
            [className]: className,
        });

        // 左侧类名
        const labelCls = classNames({
            [`${prefixCls}-label`]: true,
            [`${prefixCls}-label-2`]: labelNumber === 2,
            [`${prefixCls}-label-3`]: labelNumber === 3,
            [`${prefixCls}-label-4`]: labelNumber === 4,
            [`${prefixCls}-label-5`]: labelNumber === 5,
            [`${prefixCls}-label-6`]: labelNumber === 6,
            [`${prefixCls}-label-7`]: labelNumber === 7,
        });

        const controlCls = classNames({
            [`${prefixCls}-control`]: true,
        });

        //右边内容
        const extraCls = classNames({
            [`${prefixCls}-extra`]: true,
            [`${prefixCls}-extra-active`]: this.state.isShowPwd
        })
        // 文本框类型
        let inputType = 'text';
        if (showPwd && this.state.isShowPwd) {   // 处理显示密码
            inputType = 'text'
        } else if (type === 'bankCard' || type === 'phone') {
            inputType = 'tel';
        } else if (type === 'password') {
            inputType = 'password';
        } else if (type === 'digit') {
            inputType = 'number';
        } else if (type !== 'text' && type !== 'number') {
            inputType = type;
        } else if (showPwd && this.state.isShowPwd) {
            inputType = 'text'
        }

        // value值
        let valueProps;
        if('value' in this.props) {
            valueProps = {
                value: fixControlledValue(value),
            };
        }else{
            valueProps = {
                defaultValue
            };
        }

        // number 规则
        let patternProps;
        if(type === 'number') {
            patternProps = {
                pattern: '[0-9]*',
            };
        }

        let classNameProps;
        if (type === 'digit') {
            classNameProps = {
                className: 'h5numInput',
            };
        }

        return(
            <div className={wrapCls} style={style}>
                {children ? (<div className={labelCls}>{children}</div>) : null}
                <div className={controlCls}>
                    <Input
                        {...patternProps}
                        {...otherProps}
                        {...valueProps}
                        {...classNameProps}
                        type={inputType}
                        maxLength={maxLength}
                        name={name}
                        placeholder={placeholder}
                        readOnly={!editable}
                        onChange={this.onInputChange}
                        onFocus={this.onInputFocus}
                        onBlur={this.onInputBlur}
                    />
                </div>
                {clear && editable && !disabled && (value && value.length > 0) ?
                    <div
                        className={`${prefixCls}-clear`}
                        onClick={this.clearInput}
                    />
                : null}
                {error ? (<div className={`${prefixCls}-error-extra`} onClick={this.onErrorClick} />) : null}
                {extra !== '' ? <div className={extraCls} onClick={this.onExtraClick}>{extra}</div> : null}
            </div>
        );
    }
}

export default InputItem;
