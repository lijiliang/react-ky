/**
 * @fileOverview 幻灯片公共组件
 */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactSwipe from 'react-swipe';

import './SlideSwipe.less';
class Slideshow extends React.Component{
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
        const list = this.props.list;
        return(
            <div className="ky-slide-swipe">
                <ReactSwipe className="carousel" swipeOptions={opt}>
                    {
                        list.map((item, index) => {
                            return(
                                <div className="slide-item" key={index}><img src={item.src} alt={item.title}/></div>
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
        );
    }
}

export default Slideshow;
