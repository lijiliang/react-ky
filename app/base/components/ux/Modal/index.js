/**
 * @fileOverview 对话框总入口
 */
import Modal from './modal';
import alert from './alert';
import prompt from './prompt';
import operation from './operation';

import './index.less';

Modal.alert = alert;
Modal.prompt = prompt;
Modal.operation = operation;
export default Modal;
