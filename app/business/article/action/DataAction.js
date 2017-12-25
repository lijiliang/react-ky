/**
 * @fileOverview 文章相关 处理数据action
 */
import * as types from './actionTypes';
import Base64 from 'js-base64';
import { getPublic } from 'FetchData';
import { Cache, Urls } from 'kyCommon';
import { Toast } from 'uxComponent';
import { failLoading } from 'Utils';

/*
 * [getActicleNews 获取最新消息]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function getActicleNews(callback) {
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = getPublic(Urls.ActicleNews);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
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
 * [getActicleInfo 获取最新消息文章]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function getActicleInfo(id, callback) {
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = getPublic(Urls.ActicleInfo + '/' + id);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
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
 * [getActicleTitle 获取帮助中心 文章标题栏目]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function getActicleTitle(id, callback) {
    return (dispatch, getState) => {
        // Toast.loading('加载中...', 200);
        const response = getPublic(Urls.ActicleTitle + '/' + id);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                if(callback && typeof callback === 'function'){
                    callback(res.data);
                }
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}
