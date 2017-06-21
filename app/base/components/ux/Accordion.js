/**
* @fileOverview: Accordion 手风琴
*/
import React from 'react';
import RcCollapse, { Panel } from 'rc-collapse';
import './Accordion.less';

export default class Accordion extends React.Component {
  static Panel = Panel;

  static defaultProps = {
    prefixCls: 'ky-accordion',
  };

  render() {
    return <RcCollapse {...this.props} />;
  }
}
