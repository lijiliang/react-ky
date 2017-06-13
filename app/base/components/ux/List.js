/**
 * @fileOverview List列表
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Item from './ListItem';
import './List.less';

class List extends React.Component{
    static Item = Item;
    static defaultProps = {
        prefixCls: 'ky-list'
    }
    render(){
        let { prefixCls, children, className, style, renderHeader, renderFooter, ...restProps } = this.props;
        const wrapCls = classNames({
            [prefixCls]: true,
            [className]: className
        })
        return(
            <div className={wrapCls} style={style} {...restProps}>
                {renderHeader ? (<div className={`${prefixCls}-header`}>
                    {typeof renderHeader === 'function' ? renderHeader() : renderHeader}
                </div>) : null}
                {children ? (<div className={`${prefixCls}-body`}>{children}</div>) : null}
                {renderFooter ? (<div className={`${prefixCls}-footer`}>
                    {typeof renderFooter === 'function' ? renderFooter() : renderFooter}
                </div>) : null}
            </div>
        );
    }
}
List.propsType = {
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    children: PropTypes.element
}
export default List;
