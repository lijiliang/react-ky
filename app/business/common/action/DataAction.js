/**
 * @fileOverview common 处理数据action
 */
import * as types from './actionTypes';
import { getHasFetch, get} from 'FetchData';
import { Cache, Urls } from 'kyCommon';
import { Toast } from 'uxComponent';
import { failLoading} from 'Utils';

/*
 * [getNav 获取菜单]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function getNav(callback) {
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = getHasFetch(Urls.Nav);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                dispatch({
                    type: types.NAV,
                    nav: res.data
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

/*
 * [addShoppingCar 获取购物车总数]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function getShoppingCarCount(callback) {
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = get(Urls.ShoppingCarCount);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                dispatch({
                    type: types.CARTCOUNT,
                    cartcount: res.data
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
