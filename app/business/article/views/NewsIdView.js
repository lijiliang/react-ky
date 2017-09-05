/**
 * @fileOverview 最新消息 详情页 View
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavBar } from 'uxComponent';

import '../resources/NewsIdView.less';

class NewsIdView extends React.Component{
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
                    >最新消息</NavBar>
                <div className="m-news-content">
                    <img src="https://kyaniyoupaiyun.b0.upaiyun.com/1488962260805.jpg"/>
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
)(NewsIdView);
