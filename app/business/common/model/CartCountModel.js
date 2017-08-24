/**
 * @fileOverview 购物车总数 model
 */
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

const navCommonMap = Immutable.fromJS({
    cartcount: 0
});

export default CreateReducer(navCommonMap, {
    [type.NAV](state, action){
        const newState = state.set('cartcount', action.cartcount.num)
        ;
        return newState;
    }
});
