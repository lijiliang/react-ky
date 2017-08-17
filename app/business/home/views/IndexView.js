/**
 * @fileOverview 首页 View
 */
import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getHome} from '../action/DataAction'

import { get, past } from 'kyBase/common/FetchData';
import { Urls } from 'kyCommon';
import { InputItem, TextareaItem, List, SlideSwipe, Button, Toast} from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;

import IndexCategoryItemView from './IndexCategoryItemView';
import IndexCategorySubItemView from './IndexCategorySubItemView';
import SubGroupItem from './SubGroupItem';
import SubSingleItem from './SubSingleItem';

import '../resources/IndexView.less';
import ProductsItemImg1 from 'kyBus/home/resources/img/products-item1.jpg';
import ProductsItemImg2 from 'kyBus/home/resources/img/products-item2.jpg';
import ProductsItemImg3 from 'kyBus/home/resources/img/products-item3.jpg';
// 幻灯片模拟数据
import Banner1 from 'kyBus/home/resources/img/banner1.png';
import Banner2 from 'kyBus/home/resources/img/banner2.png';
const slideList = [
    {
        imgPath: Banner1,
        href: '',
        name: 'Banner1',
        id: '',
    },{
        imgPath: Banner2,
        href: '',
        name: 'Banner2',
        id: '',
    },{
        imgPath: 'https://kyaniyoupaiyun.b0.upaiyun.com/1470639673288.jpg',
        href: '',
        name: 'Banner3',
        id: '',
    },{
        imgPath: 'https://kyaniyoupaiyun.b0.upaiyun.com/1488422579954.jpg',
        href: '',
        name: 'Banner4',
        id: '',
    },
];

class IndexView extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isMore: false,
        };
    }
    componentDidMount(){
        // 获取首页数据
        this.props.dispatch(getHome());
    }
    render(){
        const homeData = this.props.home;
        const _bannerList = homeData.get('banner');
        console.log(_bannerList, slideList)
        return(
                <div className="ky-scrollable-white">
                    <SlideSwipe List={_bannerList}/>

                    <div className="m-category">
                        {/* 营养补充品 */}
                        <IndexCategoryItemView title="营养补充品" thumb={ProductsItemImg1}>
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
                        <IndexCategoryItemView title="护肤产品" thumb={ProductsItemImg2}>
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
                        <IndexCategoryItemView title="推广优惠及其它" thumb={ProductsItemImg3}>
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
        home: state.HomeModel
    };
}

export default connect(
    mapStateToProps
)(IndexView);
