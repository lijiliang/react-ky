/**
 * @fileOverview 首页 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { get, past } from 'kyBase/common/fetchData';
import KYHeaderBar from 'kyBus/common/views/KYHeaderBar';
import KYFooterBar from 'kyBus/common/views/KYFooterBar';

import '../resources/IndexView.less';

class IndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isMore: false
        };
    }
    componentDidMount(){
        console.log('homeInfo: ', this.props.homeInfo);
        /*
        async function axiosGet(){
            try{
                const response = await get(`/api/2`);
                await response;
                console.log(response.data);
            }catch(err){
                console.log(err);
            }
        }
        axiosGet();
        */

        const response = get('/api/2', {
            a:1,
            b:2
        });
        console.log(response)
        response.then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
    render(){
        return(
            <div className="ky-view-main">
                <KYHeaderBar  />
                <div className="ky-view-body">
                    <div className="ky-scrollable">
                        123456<br/>22222222<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                        body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                        body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                        body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                        body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                        body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>body<br/>
                        body<br/>
                        body<br/>
                        09876<br/>
                        sdfghjmnbvcxz<br/>

                    </div>
                </div>
                <KYFooterBar />
             </div>
        );
    }
}

/*  React 与  Redux 绑定 */
function mapStateToProps(state){
    return {
        homeInfo: state.HomeModel
    };
}

function mapDispatchToProps(dispatch){
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexView);
