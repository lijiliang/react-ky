/**
 * @fileOverview 公共底部 view
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../resources/KYFooterBar.less';

class KYFooterBar extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
    }
    render(){
        return(
            <footer className="ky-view-footer flex-column" id="kyFooter">
                <div className="footer-bar flex-row">
                    <div className="footer-bar-list ky-center-v">
                        <div className="bar-item">
                            <i className="icon icon-zaixiankefu"></i>
                            <div className="bar-item-text">在线客服</div>
                        </div>
                        <div className="bar-item">
                            <i className="icon icon-xiaoxi"></i>
                            <div className="bar-item-text">最新消息</div>
                        </div>
                        <div className="bar-item">
                            <i className="icon icon-shangou"></i>
                            <div className="bar-item-text">产品商城</div>
                        </div>
                        <div className="bar-item">
                            <i className="icon icon-jiarugouwuche"></i>
                            <div className="bar-item-text">购物车</div>
                            <div className="cat-num">10</div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
    };
}

function mapDispatchToProps(dispatch){
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KYFooterBar);
