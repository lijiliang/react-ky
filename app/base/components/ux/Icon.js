/**
 * @fileOverview Icon SVG 图标
 */
import React from 'react';
import classNames from 'classnames';

import './Icon.less';

class Icon extends React.Component{
    static defaultProps = {
        size: 'md',
    };

    renderSvg = () => {
        let svg;
        try {
            svg = require(`../../resources/svg/${this.props.type}.svg`);
        } catch (e) {

        } finally {
            return svg;
        }
    }
    render(){
        const { type, className, style, size, ...restProps } = this.props;
        let xlinkHref = this.renderSvg();
        let outerIcon;
        if (!xlinkHref) {
          outerIcon = true;
          xlinkHref = type;
        } else {
          xlinkHref = `#${type}`;
        }

        const iconClassName = classNames({
          'ky-icon': true,
          [`ky-icon-${outerIcon ? type.substr(1) : type}`]: true,
          [`ky-icon-${size}`]: true,
          [className]: !!className,
        });

        return <svg className={iconClassName} style={style} {...restProps}>
          <use xlinkHref={xlinkHref} />
        </svg>;
    }
}

export default Icon;
