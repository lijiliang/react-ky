/**
 * @fileOverview 用户中心 处理数据action
 */
import * as types from './actionTypes';
import { get, post, postPublic, putFetch} from 'FetchData';
import { Cache, Urls } from 'kyCommon';
import { Toast } from 'uxComponent';
import { failLoading, clearUserSession } from 'Utils';

/*
 * [signout 退出登录]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function signout(callback) {
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const isAccount = Boolean(Cache.get(Cache.keys.ky_cache_isAccount));
        const response = putFetch(Urls.UserLogout);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                // 删除sessionStorage
                clearUserSession();

                dispatch({
                    type : types.LOGIN,
                    user:{
                        userName: '',   //用户帐号
                        memberFlag: '', //是否会员
                        realName: '',   //真实名称
                        isLogined: false, //是否已登录
                        isAccount: isAccount, //是否记住帐号
                        token: '',        //用户token
                    }
                });
                Toast.success('退出成功', 1);
                if(callback && typeof callback === 'function'){
                    callback();
                }
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}

/*
 * [getCurrentUserInfo 获取当前登录会员的消息]
 * @param  {Function} callback [回调函数]
 */
export function getCurrentUserInfo(callback) {
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = get(Urls.UserCurrent);
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
