/**
 * @fileOverview 加载子页面
 */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

// 引入全站重置代码
import 'kyBase/resources/less/reset.less';

class Launch extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        console.log(this.props.location.pathname)
        return(
            <div className="ky-root-container">
                {this.props.children}
            </div>
        );
    }
}

export default Launch;
