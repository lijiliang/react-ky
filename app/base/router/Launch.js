/**
 * @fileOverview 加载子页面
 */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

// 引入全站重置代码
import 'kyBase/resources/less/reset.less';

import KYHeaderBar from 'kyBus/common/views/KYHeaderBar';
import KYFooterBar from 'kyBus/common/views/KYFooterBar';

class Launch extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        // console.log(this.props.location.pathname)
        return(
            <div className="ky-root-container">
                <div className="ky-view-main">
                    <KYHeaderBar  />
                    <div className="ky-view-body">
                        {this.props.children}
                    </div>
                    <KYFooterBar />
                 </div>
            </div>
        );
    }
}

export default Launch;
