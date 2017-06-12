/**
 * @fileOverview Picker 选择器 默认为省市区选择
 */
import React from 'react';
import PopupCascader from 'rmc-cascader/lib/Popup';
import Cascader from 'rmc-cascader/lib/Cascader';
import MultiPicker from 'rmc-picker/lib/MultiPicker';
import treeFilter from 'array-tree-filter';

import './Picker.less'
const popupProps = {
    WrapComponent: 'div',
    transitionName: 'ky-slide-up',
    maskTransitionName: 'ky-fade',
};

function getDefaultProps() {
    const defaultFormat = (values) => {
        return values.join(',');
    };
    return {
        triggerType: 'onClick',
        prefixCls: 'ky-picker',
        pickerPrefixCls: 'ky-picker-col',
        popupPrefixCls: 'ky-picker-popup',
        format: defaultFormat,
        cols: 3,
        cascade: true,
        value: [],
        extra: '请选择',
        okText: '确定',
        dismissText: '取消',
        title: '',
    };
}

class Picker extends React.Component {
    static defaultProps = getDefaultProps();

    getSel = () => {
        const value = this.props.value || [];
        let treeChildren;
        if (this.props.cascade) {
            treeChildren = treeFilter(this.props.data, (c, level) => {
                return c.value === value[level];
            });
        } else {
            treeChildren = value.map((v, i) => {
                console.log(this.props.data[i].filter(d => d.value === v)[0])
                return this.props.data[i].filter(d => d.value === v)[0];
            });
        }
        return this.props.format && this.props.format(treeChildren.map((v) => {
            return v.label;
        }));
    }

    render() {
        const { props } = this;
        const { children, value, extra, okText, itemStyle, dismissText, popupPrefixCls, cascade } = props;
        let cascader;
        let popupMoreProps = {};
        if (cascade) {
          cascader = (
            <Cascader
              prefixCls={props.prefixCls}
              pickerPrefixCls={props.pickerPrefixCls}
              data={props.data}
              cols={props.cols}
              onChange={props.onPickerChange}
              pickerItemStyle={itemStyle}
            />
          );
        } else {
          cascader = (
            <MultiPicker
              prefixCls={props.prefixCls}
              pickerPrefixCls={props.pickerPrefixCls}
              pickerItemStyle={itemStyle}
            >
              {props.data.map(d => { return { props: { children: d } }; })}
            </MultiPicker>
          );
          popupMoreProps = {
            pickerValueProp: 'selectedValue',
            pickerValueChangeProp: 'onValueChange',
          };
        }
        return (
            <PopupCascader
                cascader={cascader}
                {...popupProps}
                {...props}
                prefixCls={popupPrefixCls}
                value={value}
                dismissText={dismissText}
                okText={okText}
                {...popupMoreProps}
            >
                 {React.cloneElement(children, { extra: this.getSel() || extra })}
            </PopupCascader>
        )
    }
}

export default Picker;
