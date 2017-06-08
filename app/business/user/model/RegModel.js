/**
 * @fileOverview 注册 model
 */
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

const regConsumerMap = Immutable.fromJS({
    customer_username: '', //用户名
    customer_id: '',       //用户Id
});

export default CreateReducer(regConsumerMap, {
    [type.REGCONSUMER](state, action){
        const newState = state.set('customer_username', action.userInfo.customer_username)
                              .set('customer_id', action.userInfo.customer_id)
        ;
        return newState;
    }
});
