/**
 * @fileOverview 商品详情页 model
 */
import CreateReducer from 'kyBase/reducers/CreateReducer';
import Immutable from 'immutable';
import * as type from '../action/actionTypes';

const map = Immutable.fromJS({
    imgList: [],
    id: '',
    name: '',
    specList: [],
    qv: '', //积分
    salePrice: '', //会员价
    originalPrice: '', //原价
    description: ''
});

export default CreateReducer(map, {
    [type.PRODUCTINFOID](state, action){
        const newState = state.set('imgList', action.product.imgList)
                              .set('id', action.product.id)
                              .set('name', action.product.name)
                              .set('specList', action.product.specList)
                              .set('qv', action.product.qv)
                              .set('salePrice', action.product.salePrice)
                              .set('originalPrice', action.product.originalPrice)
                              .set('description', action.product.description)
        ;
        return newState;
    }
});
