/**
 * @fileOverview 注册 处理数据action
 */
 import * as types from './actionTypes';
 import Base64 from 'js-base64';

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
        const response = postPublic(Urls.User, _data);
        response.then((res) => {
            if(res.success){
                dispatch({
                    type : types.REGCONSUMER,
                    userInfo:{
                        customer_username: res.data.data.customer_username,
                        customer_id: res.data.data.customer_id
                    }
                });

                // 保存数据到sessionStorage
                Cache.sessionSet(Cache.sessionKeys.ky_cache_customer_username, res.data.data.customer_username);
                Cache.sessionSet(Cache.sessionKeys.ky_cache_customer_id, res.data.data.customer_id);
            }else{
                // 如果失败则显示失败信息
                Toast.info(res.message, 1);
            }
        }).catch((err) => {
            console.log(err);
        });
    };
}
