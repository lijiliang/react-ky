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

    }
    render(){
        console.log(this.state.isMore);
        return(
            <div>home</div>
        );
    }

}

export default IndexView;
