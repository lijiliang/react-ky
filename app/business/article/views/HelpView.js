/**
 * @fileOverview 帮助文章 相关 View
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavBar } from 'uxComponent';
import { getActicleInfo, getActicleTitle } from '../action/DataAction'

import '../resources/HelpView.less';

class NewsView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            title: '',
            content: '',
            typeName: '',
            titleList: []
        };
    }
    componentDidMount(){
        const _id = this.props.params.id;
        this._getActicleInfo(_id);
    }
    componentWillReceiveProps(nextProps) {
        const _id = this.props.params.id;
        if(_id !== nextProps.params.id){
            this._getActicleInfo(nextProps.params.id);
        }
    }
    // 获取文章内容
    _getActicleInfo(id) {
        this.props.dispatch(getActicleInfo('h' + id, (res) => {
            this.setState({
                typeName: res.typeName,
                title: res.title,
                content: res.content
            });
            this.props.dispatch(getActicleTitle(res.typeId, (resTitle) => {
                let _list = resTitle.filter(function(item){
                    return item.title !== res.title;
                });
                this.setState({
                    titleList: _list
                });
            }));
        }));
    }
    // 返回上一页
    gohistoryHandle(){
        window.history.back();
    }
    render(){
        const _state = this.state;
        return(
            <div className="ky-scrollable">
                <NavBar leftContent=""
                    mode="dark"
                    onLeftClick={this.gohistoryHandle.bind(this)}
                    >{_state.typeName}</NavBar>
                <div className="m-help">
                    <div className="m-help-tit">
                        <h1>{_state.title}</h1>
                    </div>
                    <div className="m-help-content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                    <div className="m-help-menu">
                        {
                            _state.titleList.map((item) => {
                                const _href = '/help/' + item.id;
                                return(
                                    <Link to={_href} className="menu-item">{item.title}</Link>
                                );
                            })
                        }
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
