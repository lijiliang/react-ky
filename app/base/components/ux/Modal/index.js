/**
 * @fileOverview 对话框总入口
 */
import Modal from './modal';
import alert from './alert';
import prompt from './prompt';

import './index.less';

Modal.alert = alert;
Modal.prompt = prompt;
export default Modal;
