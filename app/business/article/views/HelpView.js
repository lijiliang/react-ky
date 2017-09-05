/**
 * @fileOverview 帮助文章 相关 View
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavBar } from 'uxComponent';

import '../resources/HelpView.less';

class NewsView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        };
    }
    componentDidMount(){
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.back();
    }
    render(){
        return(
            <div className="ky-scrollable">
                <NavBar leftContent=""
                    mode="dark"
                    onLeftClick={this.gohistoryHandle.bind(this)}
                    >售后服务</NavBar>
                <div className="m-help">
                    <div className="m-help-tit">
                        <h1>退货承诺</h1>
                    </div>
                    <div className="m-help-content">
                        <p>
                            &nbsp;&nbsp;&nbsp;&nbsp;对于退货退款，用户可在购货起30天内提出申请，并把全数未经使用及不影响再次销售的产品退还，以享全单退款的保障。该退款将会扣除增值税11.9%及有关运费（每个子订单运费为人民币35元）。
                        </p>
                        <p>
                            对于退货退款，用户可在购货起30天内提出申请，并把全数未经使用及不影响再次销售的产品退还，以享全单退款的保障。该退款将会扣除增值税11.9%及有关运费（每个子订单运费为人民币35元）。
                        </p>
                    </div>
                    <div className="m-help-menu">
                        <Link to="/" className="menu-item">退货承诺</Link>
                        <Link to="/" className="menu-item">退货承诺</Link>
                    </div>
                </div>
            </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        // LoginModel: state.LoginModel
    };
}


export default connect(
    mapStateToProps
)(NewsView);
