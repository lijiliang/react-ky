/**
 * @fileOverview 获取信用卡国家数据
    callback 方式调用  在另外一个模块里调用
    AddressData(function(e){//后面的都放到这里执行});
 */
import Cache from './Cache';
import Urls from './Urls';
import { getPublic } from './FetchData';
import { Toast } from 'uxComponent';
import { failLoading } from 'Utils';

/*
 * [AddressData 获取信用卡国家数据]
 * @param  {Function} callback [回调函数]
 */
function CountryData(callback){
    const cache_Country = Cache.getObj(Cache.keys.ky_cache_Country);
    // 如果在localStorage已经存在数据，直接读取
    if(cache_Country){
        callback(cache_Country);
    }else{
        // 通过接口获取省市区数据
        const response = getPublic(Urls.Country);
        Toast.loading('加载中...', 2000);
        response.then((res) => {
            if(res.data.success){
                Cache.set(Cache.keys.ky_cache_Country,res.data.data);  // 设置localStorage
                callback(res.data.data);
                Toast.hide();
            }
        }).catch((err) => {
            failLoading(err);
        });
    }
}

export default CountryData;
