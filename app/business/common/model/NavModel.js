/**
 * @fileOverview common model
 */
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

const navCommonMap = Immutable.fromJS({
    about: [],
    groupProduct: [],
    help: [],
    singleProduct: [],
    skinProduct: []
});

export default CreateReducer(navCommonMap, {
    [type.NAV](state, action){
        const newState = state.set('about', action.nav.about)
                              .set('groupProduct', action.nav.groupProduct)
                              .set('help', action.nav.help)
                              .set('singleProduct', action.nav.singleProduct)
                              .set('skinProduct', action.nav.skinProduct)
        ;
        return newState;
    }
});
