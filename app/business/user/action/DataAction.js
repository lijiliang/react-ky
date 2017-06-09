/**
 * @fileOverview 注册 处理数据action
 */
 import * as types from './actionTypes';
 import Base64 from 'js-base64';
 import Toast from 'kyBase/components/ux/Toast';
 import Urls from 'Urls';
 import { post, postPublic } from 'FetchData';
 import Cache from 'Cache';

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
        const response = postPublic(Urls.User, _data);
        response.then((res) => {
            dispatch({
                type : types.REGCONSUMER,
                userInfo:{
                    customer_username: res.data.data.customer_username,
                    customer_id: res.data.data.customer_id
                }
            });

            // 保存数据到localStorage
            Cache.set(Cache.keys.ky_cache_customer_username, res.data.data.customer_username);
            Cache.set(Cache.keys.ky_cache_customer_id, res.data.data.customer_id);
        }).catch((err) => {
            console.log(err);
        });
    };
}
