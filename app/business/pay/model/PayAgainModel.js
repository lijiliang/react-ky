/**
 * @fileOverview 重新发起支付 model
 */
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

const map = Immutable.fromJS({
    tradeNo: '',  //订单号
    payAmount: '',  //金额
});

export default CreateReducer(map, {
    [type.PAYAGAIN](state, action){
        const newState = state.set('tradeNo', action.payagain.tradeNo)
                              .set('payAmount', action.payagain.payAmount)
            ;
        return newState;
    }
});
