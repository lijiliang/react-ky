/**
 * @fileOverview 支付信息 model
 */
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

const map = Immutable.fromJS({
    tradeNo: '',  //订单编号
    price: '0.00',//支付金额
    regOrder: false, // 是否是注册订单
    payType: '',  //支付类型
    payUrl: '',   //支付链接
});

export default CreateReducer(map, {
    [type.PAYMENT](state, action){
        const newState = state.set('tradeNo', action.payment.tradeNo)
                              .set('price', action.payment.price)
                              .set('regOrder', action.payment.regOrder)
                              .set('payType', action.payment.payType)
                              .set('payUrl', action.payment.payUrl)
            ;
        return newState;
    }
});
