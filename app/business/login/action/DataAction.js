/**
 * @fileOverview 登录 处理数据action
 */
import * as types from './actionTypes';
import Base64 from 'js-base64';
import { get } from 'FetchData';
import { Cache, Urls } from 'kyCommon';
import { Toast } from 'uxComponent';
import { failLoading } from 'Utils';

export function login(username, password, isAccount, callback){
    return (dispatch,getState) => {
        Toast.loading('加载中...', 200);
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
                const _token = res.access_token;

                // 保存用户名和是否记录帐户到localStorage
                Cache.set(Cache.keys.ky_cache_login_account, username);
                Cache.set(Cache.keys.ky_cache_isAccount, isAccount);
                // 保存数据到sessionStorage
                Cache.sessionSet(Cache.sessionKeys.ky_cache_access_token, _token);

                // 请求用户信息
                const userInfo = get(Urls.UserCurrent);
                userInfo.then((_res) => {
                    const userData = _res.data;
                    if(userData.success){
                        const _userInfo = userData.data;
                        Toast.hide();
                        // 保存数据到sessionStorage
                        Cache.sessionSet(Cache.sessionKeys.ky_cache_realName, _userInfo.realName);
                        Cache.sessionSet(Cache.sessionKeys.ky_cache_userName, _userInfo.userName);
                        Cache.sessionSet(Cache.sessionKeys.ky_cache_memberFlag, String(_userInfo.memberFlag));
                        Cache.sessionSet(Cache.sessionKeys.ky_cache_isLogined, true);
                        Cache.sessionSet(Cache.sessionKeys.ky_cache_last_login_time,new Date().getTime());
                        dispatch({
                            type : types.LOGIN,
                            user:{
                                userName: _userInfo.userName,   //用户帐号
                                memberFlag: _userInfo.memberFlag, //是否会员
                                realName: _userInfo.realName,   //真实名称
                                isLogined: true,      //是否已登录
                                isAccount: isAccount, //是否记住帐号
                                token: _token,        //用户token
                            }
                        });
                        Toast.success('登录成功', 1);
                        // 登录成功，回调
                        if(callback && typeof callback === 'function'){
                            callback();
                        }
                    }else{
                        Toast.info(res.message, 1);
                    }
                }).catch((err) => {
                    failLoading(err);
                });
            },
            error: function(err){
                const response = JSON.parse(err.response);
                if(response.message === 'Bad credentials'){
                    Toast.hide();
                    Toast.fail('用户名或密码错误！', 2);
                    return;
                }
                failLoading(err);
            }
        });
    };
}
