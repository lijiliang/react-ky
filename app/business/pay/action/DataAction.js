/**
 * @fileOverview 订单支付后回调完成页，支付成功/失败 处理数据action
 */
import * as types from './actionTypes';
import { get, getPublic, post, postHasFetch} from 'FetchData';
import { Urls } from 'kyCommon';
import { Toast } from 'uxComponent';
import { failLoading } from 'Utils';

/*
 * [getPayComplete 订单支付后回调数据]
 * @param  {String} payid  [订单编号]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function getPayComplete(payid, callback){
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = getPublic(Urls.OrderComplete + `/${payid}`);
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

/*
 * [payAgainBtn 重新发起支付按钮，存数据到redux]
 * @param  {[String]}   tradeNo  [订单编号]
 * @param  {[String]}   payType  [支付方式]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function payAgainBtn(tradeNo, payAmount, callback) {
    const _data = {
        tradeNo,
        payAmount
    };
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        // dispatch({
        //     type: types.PAYAGAIN,
        //     payagain: _data
        // });
        dispatch({
            type: types.PAYMENT,
            payment: {
                tradeNo: tradeNo,  //订单编号
                price: payAmount,//支付金额
                payType: '',  //支付类型
                payUrl: '',   //支付链接
            }
        });
        Toast.hide();
        if(callback && typeof callback === 'function'){
            callback(_data);
        }
    };
}

/*
 * [getPayAgain 重新发起支付]
 * @param  {[String]}   tradeNo  [订单编号]
 * @param  {[String]}   payType  [支付方式]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function getPayAgain(tradeNo, payType, callback){
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = getPublic(Urls.PayAgain + `/${tradeNo}/${payType}`);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                // dispatch({
                //     type: types.PAYAGAIN,
                //     payagain: res.data
                // });
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
 * [payeezy 信用卡支付]
 * @param  {[Object]}   data  [参数集合]
 * @param  {Function} callback [description]
 */
export function Payeezy(data, callback){
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = postHasFetch(Urls.Payeezy, data);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                // dispatch({
                //     type: types.PAYMENT,
                //     payment: res.data
                // });
                if(callback && typeof callback === 'function'){
                    callback(res.data);
                }
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}
