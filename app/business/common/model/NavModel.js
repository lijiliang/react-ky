/**
 * @fileOverview common model
 */
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

const navCommonMap = Immutable.fromJS({
    list: []
});

export default CreateReducer(navCommonMap, {
    [type.NAV](state, action){
        const newState = state.set('list', action.nav)
        ;
        return newState;
    }
});
