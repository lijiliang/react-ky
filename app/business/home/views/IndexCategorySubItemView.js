/**
 * @fileOverview 首页 栏目区块  套组或单品
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import '../resources/IndexCategorySubItemView.less';

class IndexCategorySubItemView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isChildren: false,   // 是否显示子项
        };
    }
    // 点击事件
    clickHandle = (e) => {
        this.setState({
            isChildren: !this.state.isChildren
        })
    }
    render(){
        const CategortHeadCls = classNames({
            ['category-sub-item']: true,
            ['category-sub-item-selected']: !!this.state.isChildren
        })
        const { title, thumb, children, ...restProps } = this.props;

        return(
            <div className={CategortHeadCls}>
                <div className="sub-head" onClick={this.clickHandle.bind(this)}>
                    <span>{title}</span>
                    <i className="sub-head-icon icon icon-add"></i>
                </div>
                {children && this.state.isChildren ? children : null}
            </div>
        );
    }
}

export default IndexCategorySubItemView;
