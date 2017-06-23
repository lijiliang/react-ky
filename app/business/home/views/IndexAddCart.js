/**
 * @fileOverview  加入购物车
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { Button, Stepper} from 'uxComponent';

import '../resources/IndexAddCart.less';

export default class SubGroupItem extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            showNumber: 1,
            isShowStepper: false,
        };
    }
    // 加入购物车
    addCartHandle = () => {
        this.setState({ isShowStepper: true });
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
            <div className="m-add-cart">
                {!this.state.isShowStepper ? <button onClick={this.addCartHandle}>加入购物车</button> : null}
                {this.state.isShowStepper ?
                    <Stepper
                        showNumber
                        min={1}
                        max={500}
                        isRed
                        value={this.state.showNumber}
                        onChange={this.onChange}
                        onOkClick={this.onClickHandle}
                    />
                : null }
            </div>
        );
    }
}
