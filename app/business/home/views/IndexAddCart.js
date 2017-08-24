/**
 * @fileOverview  加入购物车
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addShoppingCar, putShoppingCar } from '../action/DataAction'
import { getShoppingCarCount } from 'kyBus/common/action/DataAction'
import classNames from 'classnames';
import { Toast } from 'uxComponent';

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
        this.props.dispatch(addShoppingCar(props.productId, props.groupFlag, 1, () => {
            Toast.success('成功加入购物车', 2);
            // 加入购物车 成功后显示加减
            this.setState({ isShowStepper: true });
            setTimeout(() => {
                this.getShoppingCarCount();
            }, 2000)
        }))

    }

    // 改变数量
    onChangeNum = (val) => {
        console.log(val);
        // this.setState({ showNumber: val });
        const props = this.props;
        this.props.dispatch(putShoppingCar(props.productId, props.groupFlag, val, () => {
            // Toast.success('成功加入购物车', 2);
            // 加入购物车 成功后显示加减
            this.setState({ showNumber: val });
            setTimeout(() => {
                this.getShoppingCarCount();
            }, 2000)
        }))
    }

    // 获取购物车总数
    getShoppingCarCount(){
        this.props.dispatch(getShoppingCarCount((res) => {
            console.log(res)
        }))
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
                        onChange={this.onChangeNum}
                        // onOkClick={this.onClickHandle}
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
