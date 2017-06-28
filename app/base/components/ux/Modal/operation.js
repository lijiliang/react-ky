/**
 * @fileOverview Modal 操作弹窗
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

export default function a(...args) {
  const actions = args[0] || [{ text: '确定' }];

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
      if (res && res.then) {
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
      operation
      transparent
      prefixCls={prefixCls}
      transitionName="ky-zoom"
      closable={false}
      maskClosable
      onClose={close}
      footer={footer}
      maskTransitionName="ky-fade"
      className="ky-modal-operation"
    /> , div,
  );

  return {
    close,
  };
}
