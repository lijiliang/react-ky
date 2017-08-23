/**
 * @fileOverview  加入购物车
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addShoppingCar } from '../action/DataAction'
import classNames from 'classnames';

import { Button, Stepper} from 'uxComponent';

import '../resources/IndexAddCart.less';

class SubGroupItem extends React.Component {
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
        const props = this.props;
        this.props.dispatch(addShoppingCar(props.id, props.isGroup, () => {
            // 加入购物车 成功后显示加减
            this.setState({ isShowStepper: true });
        }))

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
        console.log(this.props)
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

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        home: state.HomeModel
    };
}

export default connect(
    mapStateToProps
)(SubGroupItem);
