/**
 * @fileOverview Toast 轻提示
 * 种轻量级反馈/提示，可以用来显示不会打断用户操作的内容，适合用于页面转场、数据交互的等场景中。
 *
 *
    @param  {[React.Element or String]} content [提示内容]
    @return {[number]}    duration   [自动关闭的延时，单位秒，默认值 3 秒]
    @return {[Function]}  onClose    [关闭后回调]
    @return {[Boolean]}   mask       [是否显示透明蒙层，防止触摸穿透，默认值 true]
    Toast.success(content, duration, onClose, mask)
    Toast.fail(content, duration, onClose, mask)
    Toast.info(content, duration, onClose, mask)
    Toast.loading(content, duration, onClose, mask)
    Toast.offline(content, duration, onClose, mask)
    Toast.hide()  // 全局配置和全局销毁方法
 * 使用
    Toast.info('这是一个 toast 提示!!!', 1);
    Toast.info('无 mask 的 toast !!!', 2, null, false);
    Toast.success('加载成功!!!', 3);
    Toast.fail('加载失败!!!', 4);
    Toast.offline('网络连接失败!!!', 5);
    Toast.loading('加载中...', 6, () => {
        console.log('加载完成!!!');
    });
 */
import React from 'react';
import Notification from 'rc-notification';
import './Toast.less';

import Success from 'kyBase/resources/svg/success.svg';
import Fail from 'kyBase/resources/svg/fail.svg';
import Offline from 'kyBase/resources/svg/offline.svg';
import Loading from 'kyBase/resources/svg/loading.svg';
let messageInstance;
const prefixCls = 'ky-toast';

/**
 * [getMessageInstance description]
 * @param  {[type]} mask [description]
 * @return {[type]}      [description]
 */
function getMessageInstance(mask) {
    if (messageInstance) {
        messageInstance.destroy();
        messageInstance = null;
    }
    messageInstance = Notification.newInstance({
        prefixCls,
        style: { top: (mask ? 0 : '50%')  },
        transitionName: 'ky-fade',
        className: mask ? `${prefixCls}-mask` : '',
    });
    return messageInstance;
}

function notice(content, type, duration = 3, onClose, mask = true) {
    const iconType = ({
        info: '',
        success: Success,
        fail: Fail,
        offline: Offline,
        loading: Loading
    })[type];

    let instance = getMessageInstance(mask);
    instance.notice({
        duration,
        style: {},
        content: !!iconType ? (
            <div className={`${prefixCls}-text ${prefixCls}-text-icon`} role="alert">
                {/* <Icon type={iconType} size="lg" /> */}
                <img src={iconType} className={`${prefixCls}-img ${prefixCls}-${type}`}/>
                <div className={`${prefixCls}-text-info`}>{content}</div>
            </div>
        ) : (
            <div className={`${prefixCls}-text`} role="alert">
                <div>{content}</div>
            </div>
        ),
        onClose: () => {
            if(onClose) {
                onClose();
            }
            instance.destroy();
            instance = null;
            messageInstance = null;
        }
    });
}

export default {
    show(content, duration, mask) {
        return notice(content, 'info', duration, () => {}, mask);
    },
    info(content, duration, noClose, mask){
        return notice(content, 'info', duration, noClose, mask);
    },
    success(content, duration, onClose, mask){
        return notice(content, 'success', duration, onClose, mask);
    },
    fail(content, duration, onClose, mask){
        return notice(content, 'fail', duration, onClose, mask);
    },
    offline(content, duration, onClose, mask){
        return notice(content, 'offline', duration, onClose, mask);
    },
    loading(content, duration, onClose, mask){
        return notice(content, 'loading', duration, onClose, mask);
    },
    hide(){
        if(messageInstance){
            messageInstance.destroy();
            messageInstance = null;
        }
    }
};
