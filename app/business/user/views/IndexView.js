/**
 * @fileOverview 会员中心layout
 */
import React from 'react';
import UserindexView from './UserIndexView';

class IndexView extends React.Component {
    render(){
        let layout;
        if(this.props.children){
            layout = this.props.children;
        }else{
            layout= (<UserindexView location={this.props.location} />);
        }
        return layout;
    }
}

export default IndexView;
