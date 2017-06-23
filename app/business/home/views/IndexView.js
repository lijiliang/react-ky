/**
 * @fileOverview 首页 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { get, past } from 'kyBase/common/FetchData';
import { Urls } from 'kyCommon';
import { InputItem, TextareaItem, List, SlideSwipe} from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;

import IndexCategoryItemView from './IndexCategoryItemView';
import IndexCategorySubItemView from './IndexCategorySubItemView';
import SubGroupItem from './SubGroupItem';
import SubSingleItem from './SubSingleItem';

import '../resources/IndexView.less';
import ProductsItemImg from 'kyBus/home/resources/img/products-item1.jpg';
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
                <div className="ky-scrollable-white">
                    <SlideSwipe List={slideList}/>

                    <div className="m-category">
                        {/* 营养补充品 */}
                        <IndexCategoryItemView title="营养补充品" thumb={ProductsItemImg}>
                            <div className="category-sub">
                                <IndexCategorySubItemView title="套组">
                                    <div className="sub-view clearfix">
                                        <SubGroupItem />
                                        <SubGroupItem />
                                    </div>
                                </IndexCategorySubItemView>
                                <IndexCategorySubItemView title="单品">
                                    <div className="sub-view clearfix">
                                        <SubSingleItem />
                                        <SubSingleItem />
                                        <SubSingleItem />
                                        <SubSingleItem />
                                        <SubSingleItem />
                                    </div>
                                </IndexCategorySubItemView>
                            </div>
                        </IndexCategoryItemView>

                        {/* 营养补充品 */}
                        <IndexCategoryItemView title="护肤产品" thumb={ProductsItemImg}>
                            <div className="category-sub">
                                <IndexCategorySubItemView title="套组">
                                    <div className="sub-view clearfix">
                                        <SubGroupItem />
                                        <SubGroupItem />
                                    </div>
                                </IndexCategorySubItemView>
                                <IndexCategorySubItemView title="单品">
                                    <div className="sub-view clearfix">
                                        <SubSingleItem />
                                        <SubSingleItem />
                                        <SubSingleItem />
                                        <SubSingleItem />
                                        <SubSingleItem />
                                    </div>
                                </IndexCategorySubItemView>
                            </div>
                        </IndexCategoryItemView>

                        {/* 营养补充品 */}
                        <IndexCategoryItemView title="推广优惠及其它" thumb={ProductsItemImg}>
                            <div className="category-sub">
                                <IndexCategorySubItemView title="推广优惠">
                                </IndexCategorySubItemView>
                                <IndexCategorySubItemView title="其它">
                                    <div className="sub-view clearfix">
                                        <SubSingleItem />
                                        <SubSingleItem />
                                    </div>
                                </IndexCategorySubItemView>
                            </div>
                        </IndexCategoryItemView>


                    </div>
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
