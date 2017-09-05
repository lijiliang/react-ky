/**
 * @fileOverview 首页展开所有商品 model
 */
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

const navCommonMap = Immutable.fromJS({
    isChildren: false
});

export default CreateReducer(navCommonMap, {
    [type.INDEXITEMOPEN](state, action){
        const newState = state.set('isChildren', action.indexItemOpen.isChildren)
        ;
        return newState;
    }
});
