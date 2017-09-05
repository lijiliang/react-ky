/**
 * @fileOverview 首页 单个栏目区块
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import '../resources/IndexCategoryItemView.less';

class IndexCategoryItemView extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isChildren: false,   // 是否显示栏目子项
        };
    }
    componentDidMount(){
        const isChildren = this.props.isChildren
        this.setState({
            isChildren: isChildren || false
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isChildren: nextProps.isChildren
        })
    }
    // 点击事件
    clickHandle = (e) => {
        this.setState({
            isChildren: !this.state.isChildren
        })
    }
    render(){
        const CategortHeadCls = classNames({
            ['category-head']: true,
            ['category-head-selected']: !!this.state.isChildren
        })
        const { title, thumb, children, ...restProps } = this.props;

        return(
            <div className="m-category-item" {...restProps}>
                <div className={CategortHeadCls} onClick={this.clickHandle.bind(this)}>
                    <img src={thumb}/>
                    <div className="head-info">
                        <h2>{title}</h2>
                        <i className="icon icon-down"></i>
                    </div>
                </div>
                {children && this.state.isChildren ? children : null}
            </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
    };
}

export default connect(
    mapStateToProps
)(IndexCategoryItemView);
