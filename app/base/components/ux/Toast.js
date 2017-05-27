/**
 * @fileOverview Toast 轻提示
 * 种轻量级反馈/提示，可以用来显示不会打断用户操作的内容，适合用于页面转场、数据交互的等场景中。
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
let messageInstance;
const prefixCls = 'ky-toast';

function getMessageInstance(mask) {
    if (messageInstance) {
        messageInstance.destroy();
        messageInstance = null;
    }
    messageInstance = Notification.newInstance({
        prefixCls,
        style: { top: (mask ? 0 : '50%')  },
        transitionName: 'am-fade',
        className: mask ? `${prefixCls}-mask` : '',
    });
    return messageInstance;
}

function notice(content, type, duration = 3, onClose, mask = true) {
    let iconType = ({
        info: '',
        success: 'success',
        fail: 'fail',
        offline: 'offline',
        loading: 'loading'
    })[type];

    let instance = getMessageInstance(mask);
    instance.notice({
        duration,
        style: {},
        content: !!iconType ? (
            <div className={`${prefixCls}-text ${prefixCls}-text-icon`} role="alert" aria-live="assertive">
                {/* <Icon type={iconType} size="lg" /> */}
                {iconType}
                <div className={`${prefixCls}-text-info`}>{content}</div>
            </div>
        ) : (
            <div className={`${prefixCls}-text`} role="alert" aria-live="assertive">
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
    SHORT: 3,
    LONG: 8,
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
