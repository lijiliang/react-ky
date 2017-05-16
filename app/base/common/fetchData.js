/**
 * @fileOverview 获取数据方法
 *
 * 使用方法：
 *   import { get, post } from './fetchData';
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

let URL;
if(__DEV__){
    URL = 'http://localhost:9002';
}else{
    URL = 'http://api.kyain.cn';
}

axios.defaults.baseURL = URL;  // 基础url前缀
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
        axios.post(`${url}`, param)
    );
};
