/**
 * @fileOverview 首页 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// 幻灯片组件
import SlideSwipe from 'kyBase/components/ux/SlideSwipe';
import '../resources/IndexView.less';

import { get, past } from 'kyBase/common/fetchData';
// 幻灯片模拟数据
import Banner1 from 'kyBus/home/resources/img/banner1.png';
import Banner2 from 'kyBus/home/resources/img/banner2.png';
const slideList = [
    {
        src: Banner1,
        href: '',
        title: 'Banner1'
    },{
        src: Banner2,
        href: '',
        title: 'Banner2'
    },{
        src: Banner1,
        href: '',
        title: 'Banner2'
    },{
        src: Banner2,
        href: '',
        title: 'Banner2'
    }
];
class IndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isMore: false
        };
    }
    componentDidMount(){
        //console.log('homeInfo: ', this.props.homeInfo);
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

        // const response = get('/api/2', {
        //     a:1,
        //     b:2
        // });
        // console.log(response)
        // response.then((res) => {
        //     console.log(res);
        // }).catch((err) => {
        //     console.log(err);
        // });
    }
    render(){
        return(
                <div className="ky-scrollable">
                    <SlideSwipe List={slideList}/>
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
