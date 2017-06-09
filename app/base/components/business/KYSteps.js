/**
 * @fileOverview 注册步骤条
 * 根据current的值高亮显示哪些步骤条
 * 用法：
     <KYSteps current={1}/>
     <KYSteps current={2}/>
     <KYSteps current={3}/>
     <KYSteps current={4}/>
     <KYSteps current={5}/>
 */
import React from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './KYSteps.less';

class KYSteps extends React.Component{
    static defaultProps = {
        prefixCls: 'ky-steps',
        current: 0,
    }
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){

    }

    render(){
        const {prefixCls, className, current, ...restProps} = this.props;
        const wrapCls = classNames({
            [className]: className,
            [prefixCls]: true,
        })
        return(
            <div {...restProps} className={wrapCls}>
                <div className={current >= 1 ? 'step-item step-item-active' : 'step-item'}><i className="icon icon-creatAC"></i></div>
                <div className={current >= 2 ? 'step-item step-item-active' : 'step-item'}>
                    <i className="icon icon-arrow"></i>
                    <i className="icon icon-enrollment"></i>
                </div>
                <div className={current >= 3 ? 'step-item step-item-active' : 'step-item'}>
                    <i className="icon icon-arrow"></i>
                    <i className="icon icon-submit"></i>
                </div>
                <div className={current >= 4 ? 'step-item step-item-active' : 'step-item'}>
                    <i className="icon icon-arrow"></i>
                    <i className="icon icon-payment"></i>
                </div>
                <div className={current >= 5 ? 'step-item step-item-active' : 'step-item'}>
                    <i className="icon icon-arrow"></i>
                    <i className="icon icon-confirm"></i>
                </div>
            </div>
        );
    }
}

export default KYSteps;
