/**
 * @fileOverview 购物车model
 */
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

const map = Immutable.fromJS({
    items: [],  // 购物车列表
    originalPrice: '',  //销售价
    preferentialPrice: '',//总优惠
    salePrice: '',        //会员价
    totalNum: '',       //总数
});

export default CreateReducer(map, {
    [type.SHOPPINGCAR](state, action){
        const newState = state.set('items', action.shappingcar.items)
                            .set('originalPrice', action.shappingcar.originalPrice)
                            .set('preferentialPrice', action.shappingcar.preferentialPrice)
                            .set('salePrice', action.shappingcar.salePrice)
                            .set('totalNum', action.shappingcar.totalNum)
            ;
        return newState;
    }
});
