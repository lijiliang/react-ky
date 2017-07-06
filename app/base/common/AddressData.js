/**
 * @fileOverview 获取所有地址数据
    callback 方式调用  在另外一个模块里调用
    AddressData(function(e){//后面的都放到这里执行});
 */
import Cache from './Cache';
import Urls from './Urls';
import { getPublic } from './FetchData';
import { Toast } from 'uxComponent';

let AddressData;
/*
 * [getAddress 获取所有省市区数据]
 * @param  {Function} callback [回调函数]
 */
function getAddress(callback){
    const cache_cityArea = Cache.getObj(Cache.keys.ky_cache_cityArea);
    // 如果在localStorage已经存在数据，则直接读取
    if(cache_cityArea){
        callback(cache_cityArea);
    }else{
        // 通过接口获取省市区数据
        let response = getPublic(Urls.Address);
        Toast.loading('加载中...', 2000);
        response.then((res) => {
            if(res.data.success){
                Cache.set(Cache.keys.ky_cache_cityArea,res.data.data);  // 设置localStorage
                callback(res.data.data);
                Toast.hide();
            }
        }).catch((err) => {
            Toast.hide();
            console.log(err);
        });
    }
}

AddressData = getAddress;

export default AddressData;
