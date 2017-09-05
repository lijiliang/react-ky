/**
 * @fileOverview 最新消息 View
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavBar } from 'uxComponent';

import '../resources/NewsView.less';

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
                    >最新消息</NavBar>
                <div className="m-news">
                    <Link to="/" className="news-item">
                        <div className="thumb">
                            <img src="https://kyaniyoupaiyun.b0.upaiyun.com/1504229444386.jpg"/>
                        </div>
                        <div className="info">
                            <h2>8月新会员礼赏</h2>
                            <p>上载日期：2017-07-31</p>
                        </div>
                        <div className="more">
                            <span>了解更多</span>
                        </div>
                    </Link>
                    <Link to="/" className="news-item">
                        <div className="thumb">
                            <img src="https://kyaniyoupaiyun.b0.upaiyun.com/1504229444386.jpg"/>
                        </div>
                        <div className="info">
                            <h2>8月新会员礼赏8月新会员礼赏8月新会员礼赏</h2>
                            <p>上载日期：2017-07-31</p>
                        </div>
                        <div className="more">
                            <span>了解更多</span>
                        </div>
                    </Link>
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
