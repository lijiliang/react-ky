/**
 * @fileOverview 注册 处理数据action
 */
import * as types from './actionTypes';
import * as payTypes from 'kyBus/pay/action/actionTypes';
import Base64 from 'js-base64';
import {hashHistory} from 'react-router'
import { post, get, getPublic, postPublic } from 'FetchData';
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
        // Toast.loading('注册中...', 200);
        const response = postPublic(Urls.User, _data);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                if(callback && typeof callback === 'function'){
                    callback(res.data.userName, password);
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
 * [getGroupReg 获取会员注册的套组信息]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function getGroupReg(callback){
    return(dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = getPublic(Urls.GroupReg);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                if(callback && typeof callback === 'function'){
                    callback(res);
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
 * @param {[Object]} data  [需要传入的数据]
 * @param {[Function]} callback    [回调函数]
 */
export function CheckAddress(data,callback) {
    return(dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = postPublic(Urls.CheckAddress, data);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                if(callback && typeof callback === 'function'){
                    callback(res);
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
                dispatch({
                    type: payTypes.PAYMENT,
                    payment: {
                        tradeNo: res.data.tradeNo,  //订单编号
                        price: res.data.price,//支付金额
                        regOrder: res.data.memberFlag, // 是否是注册订单
                        payType: res.data.payType,  //支付类型
                        payUrl: res.data.payUrl,   //支付链接
                    }
                });
                if(callback && typeof callback === 'function'){
                    callback(res.data);
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
 * [getCurrentUserInfo 获取当前登录会员的消息]
 * @param  {Function} callback [回调函数]
 */
export function getCurrentUserInfo(callback) {
    return (dispatch, getState) => {
        Toast.loading('加载中...', 200);
        const response = get(Urls.UserCurrent);
        response.then((result) => {
            const res = result.data;
            if(res.success){
                Toast.hide();
                if(callback && typeof callback === 'function'){
                    callback(res.data);
                }
            }
        }).catch((err) => {
            failLoading(err);
        });
    };
}
