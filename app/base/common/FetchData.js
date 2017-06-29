/**
 * @fileOverview 获取数据方法
 *
 * 使用方法：
 *   import { get, post } from './FetchData';
 *   const response = get('/api/2', {
 *         a:1,
 *         b:2
 *     });
 *     console.log(response)
 *     response.then((res) => {
 *         console.log(res);
 *     }).catch((err) => {
 *         console.log(err);
 *     });
 */

import axios from 'axios';
import Cache from 'Cache';

//获取token
// const access_token = Cache.sessionGet(Cache.sessionKeys.ky_cache_access_token) || '';
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/*
 * [get get请求]
 * @param  {[string]} url   [请求地址]
 * @param  {[object]} param [传入的参数]
 * @return {[object]}       [返回成功或失败的数据]
 */
export const get = (url, param) => {
    return (
        axios.get(`${url}`, {
            //header 是即将发送的自定义请求头
            headers: { Authorization: 'Bearer ' + Cache.sessionGet(Cache.sessionKeys.ky_cache_access_token) || ''},
            params: param
        })
    );
};

/*
 * [post post请求]
 * @param  {[string]} url   [请求地址]
 * @param  {[object]} param [传入的参数]
 * @return {[object]}       [返回成功或失败的数据]
 */
export const post = (url, param) => {
    return(
        axios.post(`${url}`, param, {
            headers: { Authorization: 'Bearer ' + Cache.sessionGet(Cache.sessionKeys.ky_cache_access_token) || ''},
        })
    );
};

/*
 * [公开get get请求，不需要带token]
 * @param  {[string]} url   [请求地址]
 * @param  {[object]} param [传入的参数]
 * @return {[object]}       [返回成功或失败的数据]
 */
export const getPublic = (url, param) => {
    return (
        axios.get(`${url}`, {
            params: param
        })
    );
};

/*
 * [公开post post请求，不需要带token]
 * @param  {[string]} url   [请求地址]
 * @param  {[object]} param [传入的参数]
 * @return {[object]}       [返回成功或失败的数据]
 */
export const postPublic = (url, param) => {
    return(
        axios.post(`${url}`, param)
    );
};
