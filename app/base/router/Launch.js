/**
 * @fileOverview 加载子页面
 */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Launch extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Launch;
