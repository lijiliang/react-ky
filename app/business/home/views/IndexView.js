/**
 * @fileOverview 首页 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../resources/style.less';

class IndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isMore: false
        };
    }
    componentDidMount(){
        console.log('homeInfo: ', this.props.homeInfo);
    }
    render(){
        return(
            <div>home </div>
        );
    }

}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        homeInfo: state.HomeModel
    };
}

function mapDispatchToProps(dispatch){
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexView);
