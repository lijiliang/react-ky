/**
 * @fileOverview 购物车首页 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import {login} from '../action/DataAction';

import { Button, Toast, NavBar, Stepper } from 'uxComponent';
import { Cache } from 'kyCommon';
import 'kyBase/common/sValid';

import '../resources/CartIndexView.less';

class CartIndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            showNumber: 2,
        };
    }
    componentDidMount(){
        // this.send("topBar->addItem({text:'aaa',handler:function(){alert()}},icon:"class")");
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.go(-1);
    }

    onChange = (val) => {
        // console.log(val);
        this.setState({ showNumber: val });
    }
    onClickHandle = (e) => {
        alert('a')
        console.log(e)
    }
    render(){
        return(
            <div className="ky-scrollable-write">
                <div className="ky-cart">
                    <NavBar
                        onLeftClick={this.gohistoryHandle.bind(this)}
                        ><div className="navbar-cart-tit"><i className="icon icon-shoppingCart"></i>购物车</div></NavBar>
                        <Stepper
                            showNumber
                            min={1}
                            max={500}
                            value={this.state.showNumber}
                            onChange={this.onChange}
                        />
                        <div>sadf</div>
                        <Stepper
                            showNumber
                            min={1}
                            max={500}
                            value={this.state.showNumber}
                            onChange={this.onChange}
                            onOkClick={this.onClickHandle}
                        />
                        <div>sadf</div>
                        <Stepper
                            showNumber
                            min={1}
                            max={500}
                            isRed
                            value={this.state.showNumber}
                            onChange={this.onChange}
                        />
                        <div>sadf</div>
                        <Stepper
                            showNumber
                            min={1}
                            max={500}
                            isRed
                            value={this.state.showNumber}
                            onChange={this.onChange}
                            onOkClick={this.onClickHandle}
                        />
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
