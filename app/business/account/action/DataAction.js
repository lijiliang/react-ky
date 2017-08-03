/**
 * @fileOverview 注册 处理数据action
 */
import * as types from './actionTypes';
import Base64 from 'js-base64';
import {hashHistory} from 'react-router'
import { post, postPublic } from 'FetchData';
import { Cache, Urls } from 'kyCommon';
import { Toast } from 'uxComponent';
import { failLoading } from 'Utils';

/*
 * [regConsumer 注册消费者]
 * @param  {[String]} firstName   [姓氏]
 * @param  {[String]} lastName    [名字]
 * @param  {[String]} email       [邮箱]
 * @param  {[String]} password    [密码]
 * @param  {[String]} referenceId [推荐人会员号]
 */
export function regConsumer(firstName, lastName, email, password, referenceId, callback){
    return (dispatch, getState) => {
        const _data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            recommender:referenceId
        };
        Toast.loading('注册中...', 200);
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
                }, 1500);

                if(callback && typeof callback === 'function'){
                    callback();
                }
            }else{
                Toast.hide();
                // 如果失败则显示失败信息
                Toast.info(res.message, 1);
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}

/*
 * [CheckDealerReg 注册会员帐号 验证：会员注册帐户信息表单专用]
 * @param {[String]} addrPrivonce  [省]
 * @param {[String]} addrCity      [市]
 * @param {[String]} addrCounty    [区]
 * @param {[String]} addrDetail    [详细地址]
 * @param {[String]} email         [邮箱]
 * @param {[String]} firstName     [姓氏]
 * @param {[String]} idCard        [身份证号]
 * @param {[String]} lastName      [名字]
 * @param {[String]} password      [密码]
 * @param {[String]} phoneNumber   [手机号]
 * @param {[String]} postcode      [邮编]
 * @param {[String]} reRecommender [确认推荐人（安置人） ]
 * @param {[String]} recommender   [推荐人]
 * @param {[String]} telNumber     [固定电话号码]
 * @param {[Function]} callback    [回调函数]
 */
export function CheckDealerReg(addrPrivonce, addrCity, addrCounty, addrDetail, email, firstName, idCard, lastName, password, phoneNumber, postcode, reRecommender,  recommender, telNumber, callback){
    return (dispatch, getState) => {
        const _data = {
            addrPrivonce,
            addrCity,
            addrCounty,
            addrDetail,
            email,
            firstName,
            idCard,
            lastName,
            password,
            phoneNumber,
            postcode,
            reRecommender,
            recommender,
            telNumber
        };
        Toast.loading('加载中...', 200);
        const response = postPublic(Urls.CheckDealerReg, _data);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                if(callback && typeof callback === 'function'){
                    callback();
                }
            }else{
                Toast.info(res.message, 1);
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}

/*
 * [CheckAddress  验证：收货信息表单]
 * @param {[String]} addrPrivonce  [省]
 * @param {[String]} addrCity      [市]
 * @param {[String]} addrCounty    [区]
 * @param {[String]} addrDetail    [详细地址]
 * @param {[String]} consignee     [收件人]
 * @param {[String]} idCard        [身份证号]
 * @param {[String]} phoneNumber   [手机号码]
 * @param {[String]} postcode      [邮编]
 * @param {[String]} telNumber     [电话号码]
 * @param {Boolean} isDefault      [是否默认]
 * @param {[Function]} callback    [回调函数]
 */
export function CheckAddress(addrPrivonce, addrCity, addrCounty, addrDetail, consignee, idCard, phoneNumber, postcode, telNumber, isDefault, callback) {
    return(dispatch, getState) => {
        const _data = {
            addrPrivonce,
            addrCity,
            addrCounty,
            addrDetail,
            consignee,
            idCard,
            phoneNumber,
            postcode,
            telNumber,
            isDefault
        };
        Toast.loading('加载中...', 200);
        const response = postPublic(Urls.CheckAddress, _data);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                if(callback && typeof callback === 'function'){
                    callback();
                }
            }else{
                Toast.info(res.message, 1);
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}

/*
 * [UserDealer 注册会员/经销商
 * @param {[Object]} data     [注册需要的字段]
 * @param {Function} callback [成功回调函数]
 */
export function UserDealer(data, callback) {
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = postPublic(Urls.UserDealer, data);
        response.then((result) => {
            const res = result.data;
            if(res.success) {
                Toast.hide();
                if(callback && typeof callback === 'function'){
                    callback();
                }
            }else{
                Toast.info(res.message, 1);
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}
