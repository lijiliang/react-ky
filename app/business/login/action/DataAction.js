/**
 * @fileOverview 登录 处理数据action
 */
import * as types from './actionTypes';
import Base64 from 'js-base64';
import Toast from 'kyBase/components/ux/Toast';
import Urls from 'Urls';
import { get } from 'FetchData';
import Cache from 'Cache';

export function login(username,password,isAccount){
    return (dispatch,getState) => {
        const kyaniSecurity = Base64.Base64.encode('kyani-shop:security');
        $.ajax({
            type: 'POST',
            url: Urls.Login,
            data: {
                grant_type : 'password',
                username :username,
                password : password,
                scope : 'read write'
            },
            headers: {
                Authorization: 'Basic ' + kyaniSecurity,
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(res){
                dispatch({
                    type : types.LOGIN,
                    user:{
                        username:username,
                        password:password,
                        isLogined: true,        // 是否登录
                        isAccount: isAccount,   // 是否记住帐号
                        token:res.access_token
                    }
                });
                console.log('isAccount', isAccount)
                // 保存数据到localStorage
                Cache.set(Cache.keys.ky_cache_login_account, username);
                Cache.set(Cache.keys.ky_cache_isAccount, isAccount);
                // 保存数据到sessionStorage
                Cache.sessionSet(Cache.sessionKeys.ky_cache_access_token, res.access_token);
                Cache.sessionSet(Cache.sessionKeys.ky_cache_isLogined, true);
                Cache.sessionSet(Cache.sessionKeys.ky_cache_last_login_time,new Date().getTime());

                // 请求用户信息
                const userInfo = get(Urls.User);
                userInfo.then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err)
                });
            },
            error: function(err){
                const response = JSON.parse(err.response);
                if(response.message === 'Bad credentials'){
                    Toast.fail('用户名或密码错误！', 2);
                }
            }
        });
    };
}
