/**
 * @fileOverview 用户中心 处理数据action
 */
import * as types from './actionTypes';
import { getHasFetch} from 'FetchData';
import { Cache, Urls } from 'kyCommon';
import { Toast } from 'uxComponent';
import { failLoading, clearUserSession } from 'Utils';

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
