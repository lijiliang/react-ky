/**
 * @fileOverview 会员注册layout
 */
import React from 'react';
import AccountIndexView from './AccountIndexView';

class IndexView extends React.Component {
    render(){
        let layout;
        if(this.props.children){
            layout = this.props.children;
        }else{
            layout= (<AccountIndexView location={this.props.location} />);
        }
        return layout;
    }
}

export default IndexView;
