/**
 * @fileOverview 注册 处理数据action
 */
import * as types from './actionTypes';
import Base64 from 'js-base64';
import {hashHistory} from 'react-router'
import { post, postPublic } from 'FetchData';
import { Cache, Urls } from 'kyCommon';
import { Toast } from 'uxComponent';

// 注册消费者
export function regConsumer(firstName, lastName, email, password, referenceId){
    return (dispatch, getState) => {
        const _data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            recommender:referenceId
        };
        Toast.loading('注册中...', 1000);
        const response = postPublic(Urls.User, _data);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                dispatch({
                    type : types.REGCONSUMER,
                    userInfo:{
                        customer_username: res.data.customer_username,
                        customer_id: res.data.customer_id
                    }
                });

                // 保存数据到sessionStorage
                Cache.sessionSet(Cache.sessionKeys.ky_cache_customer_username, res.data.customer_username);
                Cache.sessionSet(Cache.sessionKeys.ky_cache_customer_id, res.data.customer_id);
                Cache.sessionSet(Cache.sessionKeys.ky_cache_isLogined, true);
                Cache.sessionSet(Cache.sessionKeys.ky_cache_last_login_time,new Date().getTime());

                Toast.hide();
                Toast.info('恭喜您，注册成功', 1);
                setTimeout(() => {
                    hashHistory.push('/');
                }, 1500)
            }else{
                Toast.hide();
                // 如果失败则显示失败信息
                Toast.info(res.message, 1);
            }
        }).catch((err) => {
            console.log(err);
        });
    };
}
