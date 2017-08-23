/**
 * @fileOverview 购物车 处理数据action
 */
import * as types from './actionTypes';
import Base64 from 'js-base64';
import { get } from 'FetchData';
import { Cache, Urls } from 'kyCommon';
import { Toast } from 'uxComponent';
import { failLoading} from 'Utils';

/*
 * [getShoppingCar 获取购物车所有商品数据]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function getShoppingCar(callback){
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = get(Urls.ShoppingCar);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                dispatch({
                    type: types.SHOPPINGCAR,
                    shappingcar: res.data
                });
                if(callback && typeof callback === 'function'){
                    callback(res.data);
                }
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}
