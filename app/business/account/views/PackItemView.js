/**
 * @fileOverview 套组单项  view
 * 调用：
    <PackItemView active icon/>
    <PackItemView active/>
    <PackItemView icon listData={{a:123}}/>
 */
import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { KYGroupProductList } from 'kyComponent';

import '../resources/PackItemView.less';

class PackItemView extends React.Component {
    static defaultProps = {
        prefixCls: 'm-pack',
        icon: false,        //是否需要icon
        active: false,      //是否高亮显示
        listData: {}        //数据源
    }
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        };
    }

    componentDidMount(){
    }
    render(){
        const { prefixCls, active, icon, value, checked, ...restProps} = this.props;
        const listData = this.props.listData || [];
        let productListLen = 0;  // 产品数量  目前用来区别 “体验包” 与其它套组的区别
        if(typeof listData.productList != 'undefined'){
            productListLen = listData.productList.length;
        }
        const wrapCls = classNames({
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-active`]: active,            //明确要传过来active才显示高亮
            [`${prefixCls}-active`]: value === checked,
        })
        const radioItemCls = classNames({
            [`icon`]: true,
            [`icon-fill`]: true,
            [`icon-selectFill`]: value === checked,
        });
        return(
            <div  {...restProps} className={wrapCls}>

                <div className="m-pack-header">
                    <div className="head-view">
                        {icon ?
                            <label>
                                <div className="pack-radio">
                                    <input type="radio" value={this.props.value} checked={this.props.value === this.props.checked}/>
                                    <span className="icon-bg"></span>
                                    {/* <i className={radioItemCls}></i> */}
                                </div>
                            </label>
                        : null}
                        <strong className="pack-name">{listData.groupName}</strong>
                        <div className="member-price">
                            {
                                productListLen > 1
                                ? <span>会员价</span>
                                : null
                            }
                            <span className="price">￥{listData.salePrice}</span>
                        </div>
                    </div>
                    {
                        productListLen === 1
                        ? <div className="elect-package">
                            <p>温馨提示 : 当您选择了此套组后，</p>
                            <p>将会失去购买其他更吸引的加入套组的机会</p>
                        </div>
                        : null
                    }
                </div>
                {/* 内容 */}
                {
                    productListLen > 1
                    ? <div className="m-pack-body">
                        {
                            listData.groupImage
                            ? <div className="thumb">
                                <img src={listData.groupImage}/>
                            </div>
                            : null
                        }
                        <div className="pack-content">
                            <div className="con-tit">内容</div>
                            <KYGroupProductList productList={listData.productList}/>
                            <ul className="other-list">
                                <li><span>原价</span><span className="price">¥{listData.originalPrice}</span></li>
                                <li><span>积分</span><span>{listData.qv ? listData.qv : '0'}</span></li>
                            </ul>
                        </div>
                    </div>
                    : null
                }
            </div>
        );
    }
}
//严格来说，这些暴露给外部的参数都需要做验证,常用的验证类型为array，bool，func，number，object，string
PackItemView.propTypes = {
    icon: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    listData: PropTypes.object.isRequired,
}
export default PackItemView;
