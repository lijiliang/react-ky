/**
 * @fileOverview 首页 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        return(
            <div>home</div>
        );
    }
}

export default IndexView;
