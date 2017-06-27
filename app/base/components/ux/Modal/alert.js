/**
 * @fileOverview Modal 警告弹窗
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

export default function a(...args) {
    const title = args[0];
    const content = args[1];
    const actions = args[2] || [{text: '确定'}];

    if(!title && !content) {
        return {
            close: () => {},
        };
    }

    const prefixCls = 'ky-modal';
    let div = document.createElement('div');
    document.body.appendChild(div);

    function close() {
        ReactDOM.unmountComponentAtNode(div);
        div.parentNode.removeChild(div);
    }

    const footer = actions.map((button) => {
        const orginPress = button.onPress || function() {};
        button.onPress = () => {
            const res = orginPress();
            if(res && res.then){
                res.then(() => {
                    close();
                });
            } else {
                close();
            }
        };
        return button;
    });

    ReactDOM.render(
        <Modal
            visible
            transparent
            prefixCls={prefixCls}
            title={title}
            transitionName="ky-zoom"
            closable={false}
            maskClosable={false}
            footer={footer}
            maskTransitionName="ky-fade"
        >
            <div style={{ zoom: 1, overflow: 'hidden' }}>{content}</div>
        </Modal>, div,
    );
    return {
        close,
    };
}
