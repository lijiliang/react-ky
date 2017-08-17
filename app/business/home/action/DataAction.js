/**
 * @fileOverview 首页 处理数据action
 */
 import * as types from './actionTypes';
 import { getHasFetch} from 'FetchData';
 import { Urls } from 'kyCommon';
 import { Toast } from 'uxComponent';
 import { failLoading} from 'Utils';

/*
 * [getHome 获取首页数据]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function getHome(callback) {
    return (dispatch, getState) => {
        // Toast.loading('加载中...', 200);
        const response = getHasFetch(Urls.Home);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                dispatch({
                    type: types.HOME,
                    home: res.data
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
