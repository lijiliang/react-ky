/**
 * @fileOverview 幻灯片公共组件
 * 需要传入的参数是：List
 * [
 *  {
         imgPath: '',
         href: '',
         name: '',
         id: '',
     }
 * ]
 */
import React from 'react';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactSwipe from 'react-swipe';
import { Loading} from 'uxComponent';

import './SlideSwipe.less';
class SlideSwipe extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            index: 0,
        };
    }
    render(){
        const opt = {
            auto: 2000,
            callback: function(index){
                this.setState({ index: index });
            }.bind(this)
        };
        const list = this.props.List;
        return(
            <div className="ky-slide-swipe">
                {
                    list.length > 1 ?
                        <div class="m-slide-swipe">
                            <ReactSwipe className="carousel" swipeOptions={opt}>
                                {
                                    list.map((item, index) => {
                                        return(
                                            <div className="slide-item" key={index}><img src={item.imgPath} alt={item.name}/></div>
                                        );
                                    })
                                }
                            </ReactSwipe>
                            <div className="slide-dot">
                                <ul>
                                    {
                                        list.map((item, index) => {
                                            return(<li className={this.state.index === index ? 'selected' : ''} key={index}></li>);
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    :
                        <div className="m-home-loading">
                            <Loading/>
                        </div>
                }

            </div>
        );
    }
}
SlideSwipe.PropTypes = {
    List: React.PropTypes.array
};
export default SlideSwipe;
