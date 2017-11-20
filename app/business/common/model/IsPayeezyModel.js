/**
 * @fileOverview 信息卡支付页面区别是否注册 model
 */
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

const dataMap = Immutable.fromJS({
    regOrder: false
});

export default CreateReducer(dataMap, {
    [type.ISPAYEEZYREG](state, action){
        const newState = state.set('regOrder', action.data.regOrder)
        ;
        return newState;
    }
});
