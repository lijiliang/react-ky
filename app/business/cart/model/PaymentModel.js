/**
 * @fileOverview 支付信息 model
 */
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

const map = Immutable.fromJS({
    tradeNo: '',  //订单编号
    payType: '',  //支付类型
    payUrl: '',   //支付链接
    price: '0'    //支付金额
});

export default CreateReducer(map, {
    [type.PAYMENT](state, action){
        const newState = state.set('tradeNo', action.payment.tradeNo)
                              .set('payType', action.payment.payType)
                              .set('payUrl', action.payment.payUrl)
                              .set('price', action.payment.price)
            ;
        return newState;
    }
});
