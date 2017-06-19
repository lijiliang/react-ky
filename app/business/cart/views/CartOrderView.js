/**
 * @fileOverview 购物车->核对订单信息 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import {login} from '../action/DataAction';

import { Button, Toast, NavBar,Stepper } from 'uxComponent';
import { Cache } from 'kyCommon';
import 'kyBase/common/sValid';

import '../resources/CartOrderView.less';

class CartIndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

        };
    }
    componentDidMount(){
        // this.send("topBar->addItem({text:'aaa',handler:function(){alert()}},icon:"class")");
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }

    render(){
        return(
            <div className="ky-scrollable">
                <div className="ky-cart">
                    cart  核对订单信息
                </div>
            </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        LoginModel: state.LoginModel
    };
}


export default connect(
    mapStateToProps
)(CartIndexView);
