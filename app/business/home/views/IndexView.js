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
import { InputItem, TextareaItem, List, SlideSwipe, Button, Modal, Toast} from 'uxComponent';
const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
const prompt = Modal.prompt;

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
            isMore: false,
            modal1: false,
      modal2: false,
      modal3: false,
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
    showModal = key => (e) => {
    // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
    // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
    render(){
        return(
                <div className="ky-scrollable-white">
                    <Button title="asdf" onClick={this.showModal('modal1')}/>
                    <Modal
                      title="这是 title"
                      transparent
                      maskClosable={true}
                      visible={this.state.modal1}
                      onClose={this.onClose('modal1')}
                      footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                    >
                      这是内容...<br />
                      这是内容...<br />
                    </Modal>

                     <Button title="Modal 对话框 （Android）" onClick={this.showModal('modal2')} />
                    <Modal
                      title="这是 title"
                      transparent
                      maskClosable={false}
                      visible={this.state.modal2}
                      onClose={this.onClose('modal')}
                      footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal2')(); } }]}
                      platform="android"
                  />

                  <Button title="Modal 对话框 （iOS）" onClick={this.showModal('modal3')} />
                 <Modal
                   title="这是 title"
                   transparent
                   maskClosable={false}
                   visible={this.state.modal3}
                   onClose={this.onClose('modal3')}
                   footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal3')(); } }]}
                   platform="ios"
               />

               <Button title="确认对话框" onClick={() => alert('删除', '确定删除么???', [
                  { text: '取消', onPress: () => console.log('cancel') },
                  { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
                ])}
                />

                <Button title="按钮 Promise" onClick={() => alert('删除', '确定删除么???', [
                  { text: '取消', onPress: () => console.log('cancel') },
                  {
                    text: '确定',
                    onPress: () => new Promise((resolve) => {
                      Toast.info('onPress Promise', 1);
                      setTimeout(resolve, 1000);
                    }),
                    style: { fontWeight: 'bold' },
                  },
                ])}
                />
                <Button title="弹出多个按钮"  onClick={() => alert('多个按钮情况', <div>这里有好多个按钮, 你试试</div>, [
                  { text: '按钮一', onPress: () => console.log('第0个按钮被点击了') },
                  { text: '按钮二', onPress: () => console.log('第1个按钮被点击了') },
                  { text: '按钮三', onPress: () => console.log('第2个按钮被点击了') },
                ])}
                />

                    <Button title="按钮 Promise"  onClick={() => prompt('输入名字', '这是名字的 message',
                      [
                        { text: '取消' },
                        {
                          text: '提交',
                          onPress: value => new Promise((resolve) => {
                            Toast.info('onPress promise', 1);
                            setTimeout(() => {
                              resolve();
                              console.log(`value:${value}`);
                            }, 1000);
                          }),
                        },
                      ])}
                    />

                    <Button title="输入框默认值" onClick={() => prompt('默认值', '默认值 defaultValue 类型', [
                      { text: '取消' },
                      { text: '提交', onPress: value => console.log(`输入的内容:${value}`) },
                    ], 'plain-text', '100')}
                    />
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
