/**
 * @fileOverview 订单支付后回调完成页，支付成功/失败 model
 */
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

const map = Immutable.fromJS({
    payAmount: '',  //支付金额
    paymentSucc: '',//是否支付成功
    regOrder: '',   //是否注册订单
    tradeNo: '',    //订单号
    userName: '',   //用户名
});

export default CreateReducer(map, {
    [type.PAYCOMPLETE](state, action){
        const newState = state.set('payAmount', action.paycomplete.payAmount)
                              .set('paymentSucc', action.paycomplete.paymentSucc)
                              .set('regOrder', action.paycomplete.regOrder)
                              .set('tradeNo', action.paycomplete.tradeNo)
                              .set('userName', action.paycomplete.userName)
            ;
        return newState;
    }
});
