/**
 * @fileOverview 订单支付后回调完成页，支付成功/失败 处理数据action
 */
import * as types from './actionTypes';
import { get } from 'FetchData';
import { Urls } from 'kyCommon';
import { Toast } from 'uxComponent';
import { failLoading } from 'Utils';

/*
 * [getPayComplete 订单支付后回调数据]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function getPayComplete(payid, callback){
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = get(Urls.OrderComplete + `/${payid}`);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                dispatch({
                    type: types.PAYCOMPLETE,
                    paycomplete: res.data
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
