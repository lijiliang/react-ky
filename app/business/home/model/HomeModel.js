/**
 * @fileOverview 首页 model
 */
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

const navCommonMap = Immutable.fromJS({
    banner: [],
});

export default CreateReducer(navCommonMap, {
    [type.HOME](state, action){
        const newState = state.set('banner', action.home.banner)
        ;
        return newState;
    }
});
