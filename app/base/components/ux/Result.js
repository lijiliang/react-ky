/**
 * @fileOverview Result 结果页
 * 在整张页面中组织插画、图标、文字等内容，向用户反馈操作结果
 */
import React from 'react';
import Button from './Button';
import classNames from 'classnames';
import './Result.less'

export default class Result extends React.Component {
  static defaultProps = {
    prefixCls: 'ky-result',
    buttonType: '',
    buttonClick: () => {},
  };

  render() {
    const {
      prefixCls,
      className,
      img,
      imgUrl,
      title,
      message,
      buttonText,
      buttonClick,
      buttonType,
      style,
    } = this.props;
    const wrapCls = classNames({
      [`${prefixCls}`]: true,
      [className]: className,
    });

    let imgContent = null;
    if (img) {
      imgContent = <div className={`${prefixCls}-pic`}>{img}</div>;
    } else if (imgUrl) {
      imgContent = <div className={`${prefixCls}-pic`} style={{ backgroundImage: `url(${imgUrl})` }} />;
    }

    return (
      <div className={wrapCls} style={style} role="alert">
        {imgContent}
        {title ? <div className={`${prefixCls}-title`}>{title}</div> : null}
        {message ? <div className={`${prefixCls}-message`}>{message}</div> : null}
        {buttonText ? <div className={`${prefixCls}-button`}>
          <Button type={buttonType} onClick={buttonClick} title={buttonText}></Button>
        </div> : null}
      </div>
    );
  }
}
