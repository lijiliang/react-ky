/**
 * @fileOverview 购物车layout
 */
import React from 'react';
import Subpage from './CartIndexView';

class IndexView extends React.Component {
    render(){
        let layout;
        if(this.props.children){
            layout = this.props.children;
        }else{
            layout= (<Subpage location={this.props.location} />);
        }
        return layout;
    }
}

export default IndexView;
