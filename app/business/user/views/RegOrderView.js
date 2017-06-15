/**
 * @fileOverview 确认订单及填写收货地址
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from '../action/actionTypes';
import {regConsumer} from '../action/DataAction';

import '../resources/RegOrderView.less';

class RegOrderView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        };
    }
    render(){
        return(
            <div>RegOrderView </div>
        );
    }
}

export default RegOrderView;
