/**
 * @fileOverview 优惠券
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { get, getPublic } from 'kyBase/common/FetchData';

//组件
import {NavBar} from 'uxComponent';
import '../resources/CouponView.less';

class CouponView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        };
    }
    componentDidMount(){}
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }
    render(){
        return(
            <div className="ky-container-body">
                <div className="ky-scrollable-white">
                    <div className="m-coupon">
                        <NavBar
                            onLeftClick={this.gohistoryHandle.bind(this)}
                            mode="blue"
                            >我的优惠券</NavBar>
                        <div className="m-coupon-view">
                            <div className="coupon-tab">
                                <div className="tab-item tab-active">可使用的优惠券</div>
                                <div className="tab-item">已使用的优惠券</div>
                            </div>
                            <div className="coupon-tab coupon-tab-no">
                                <div className="tab-item tab-active">可使用的优惠券</div>
                                <div className="tab-item">已使用的优惠券</div>
                            </div>
                            <div className="coupon-wrapper">
                                <div className="item">
                                    <p className="tit">满<span>￥4,000</span>即減</p>
                                    <p className="price"><span>¥</span>150</p>
                                    <p className="time">使用日期: 2017.01.31 至 2017.12.31</p>
                                </div>
                                <div className="item item-used">
                                    <p className="tit">满<span>￥4,000</span>即減</p>
                                    <p className="price"><span>¥</span>150</p>
                                    <p className="time">使用日期: 2017.01.31 至 2017.12.31</p>
                                </div>
                                {/* <div className="coupon-no">暂无优惠券！</div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CouponView;
