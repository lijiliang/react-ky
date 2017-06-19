/**
 * @fileOverview Stepper 步进器 用于商品的加减处理
 */
import React from 'react';
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';
import './Stepper.less';

export default class Stepper extends React.Component {
    static defaultProps = {
        prefixCls: 'ky-stepper',
        step: 1,
        readOnly: false,
        showNumber: false,
        focusOnUpDown: false,
        useTouch: true,
    }
    // 确定 点击事件触发的回调函数
    onOkClick = (e) => {
        if (this.props.onOkClick){
            this.props.onOkClick(e);
        }
    }
    render(){
        const { className, showNumber, isRed, ...restProps } = this.props;

        const steppermain = classNames({
            ['ky-stepper-main']: true,
            ['ky-stepper-red']: !!isRed,
        })

        const stepperClass = classNames({
            [className]: !!className,
            ['showNumber']: !!showNumber
        });

        return(
            <div className={steppermain}>
                <RcInputNumber
                    upHandler={<i className="icon icon-add"></i>}
                    downHandler={<i className="icon icon-reduce"></i>}
                    {...restProps}
                    ref="inputNumber"
                    className={stepperClass}
                />
                  <div className="ky-stepper-extra" onClick={this.onOkClick}>
                      <span>确定</span>
                  </div>
            </div>
        )
    }
}
