/**
 * @fileOverview  加入购物车
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addShoppingCar, updateShoppingCar } from '../action/DataAction'
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
            carId: 0,
        };
    }
    // 加入购物车
    addCartHandle = () => {
        const props = this.props;
        this.props.dispatch(addShoppingCar(props.productId, props.groupFlag, 1, (res) => {
            Toast.success('成功加入购物车', 2);
            this.setState({
                isShowStepper: true, //显示加减按钮
                carId: res.carId,    // 购物车ID
                showNumber: res.num  // 购物车数量
            });
            setTimeout(() => {
                this.getShoppingCarCount();
            }, 2000)
        }))

    }

    // 改变数量
    onChangeNum = (val) => {
        const props = this.props;
        this.props.dispatch(updateShoppingCar(this.state.carId, props.groupFlag, val, (res) => {
            // Toast.success('成功加入购物车', 2);
            this.setState({
                carId: res.carId,
                showNumber: res.num
            });
            this.getShoppingCarCount();
        }))
    }

    // 获取购物车总数
    getShoppingCarCount(){
        this.props.dispatch(getShoppingCarCount())
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
