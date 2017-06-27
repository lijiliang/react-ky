/**
 * @fileOverview 路由工具类 路由跳转控制
 */
import { hashHistory, router } from 'react-router';

const RouterHandle = {
    rcMaps: {},

    regComponent:function(cfg){
        const path=this._getPath(cfg.path);
        this.rcMaps[path]=cfg;
    },
    unRegComponent:function(path){
        this.rcMaps[path]=null;
    },
    regCmp:function(cfg){
        this.regComponent(cfg);
    },
    unRegCmp:function(path){
        this.unRegComponent(path);
    },

    //基本的路由堆盏，堆栈顶端为当前页面
    routeHashs: [],
    mainStack: [],
    // 跳转到某一个页面
    go:function(path){
        window.location.type='forward';
        window.location.currRouteAction = 'forward';
        const _path = this._getPath(path);

        this._go(path);
    },
    _go:function(path){
        this.pushToHash(this._getPath(path));
        hashHistory.push(path);
    },

    // 在当前堆盏的基础上新健一个堆盏，以后go back 操作都在该堆盏中进行，必须与 dismiss 成对出现
    present:function(path){
        window.location.type='forward';
        window.location.currRouteAction='present';
        const _path=this._getPath(path);
        this._present(_path);
    },

    _present:function(_path){
        //这要压入一个_path 否则 dismiss 的后退会再退到前一页
        this.pushToHash(_path);
        const stack = [_path];
        this.mainStack[this.mainStack.length] = this.routeHashs;
        this.routeHashs=stack;
        hashHistory.push(_path);
    },

    back:function(path){
        if(path){
            const _path = this._getPath(path);
            //先找到回退的路径在哪里，用这个方法会退到靠近盏顶的那个
            const index = this.routeHashs.lastIndexOf(_path);
            if (index === -1){
                //如果会推的路由不存在，先报一个错，随后看情况再解决
                console.error('回退的路由在堆栈不存在');
            }else{
                //将之前的页面退盏
                this.backToIndex(index);
            }
        }else{
            console.log(this.routeHashs)
            //path没有传，直接跳转
            //hashHistory，只能正向跳转
            this.routeHashs.pop();
            if (this.routeHashs.length > 0){
                window.location.type='back';
                window.location.currRouteAction='back';
                const lastPath = this.routeHashs[this.routeHashs.length - 1];
                hashHistory.push(lastPath);
            }else{
                this.dismiss(path);
            }
        }
    },

    // 在当前堆盏中回退到从盏低开始的第 index 个页面 ,从 0 开始
    backToIndex:function(index){
        window.location.type='back';
        window.location.currRouteAction='back';
        if(index >= this.routeHashs.length){
            console.error('回退的路由在堆栈中溢出');
        }else{
            this.routeHashs = this.routeHashs.slice(0,index + 1);
            hashHistory.push(this.routeHashs[this.routeHashs.length - 1]);
        }
    },

    // 在当前堆盏中回退到从盏顶开始的第 index 个页面 ,从 0 开始
    backToLastIndex:function(index){
        let _index = this.routeHashs.length - index + 1;
        this.backToIndex(index);
    },

    //返回上一个堆盏， 如果 path 有值， 那么回退到上一个堆盏中的 path 处
    dismiss:function(path){
        window.location.currRouteAction='dismiss';
        if(this.mainStack.length > 0){
            this.routeHashs = this.mainStack[this.mainStack.length - 1];
            this.mainStack.pop();
            this.back(path);
        }
    },

    //返回上一个堆盏， 并将 path 压入上一个堆盏的顶端
    dismissTo:function(path){
        if(path){
            if(this.mainStack.length > 0){
                this.routeHashs = this.mainStack[this.mainStack.length - 1];
                this.mainStack.pop();
                this.routeHashs.pop();
                this.go(path);
            }
        }else{
            console.error('dismissTo path 参数不能为空');
        }
    },

    // 检查当前堆盏中是否存在 path 路径
    indexOfPath:function(path){
        const _path=this._getPath(path);
        let indexs = [];
        let idx = this.routeHashs.indexOf(_path);
        while (idx !== -1) {
            indexs.push(idx);
            idx = this.routeHashs.indexOf(_path,idx+1);
            //idx = array.indexOf(_path, idx + 1);
        }
        return indexs;
    },

    // 将当前路由盏的某个url 替换成 new url , index 从 0 开始算起
    // 除非你非常明确你的路由堆栈，否则不建议使用
    replaceAtIndex:function(newurl ,index){
        if (this.routeHashs[index]){
            this.routeHashs[index] = newurl;
        }else{
            console.error('replaceAtIndex : index 超出范围');
        }
    },

    //清空所有堆栈，并重新创建一个堆盏，将 path 压入盏顶
    redirect:function(path){
        window.location.currRouteAction='back';
        this.setForward(true);
        const _path = this._getPath(path);
        const stack = [_path];
        this.mainStack=[];
        this.routeHashs=stack;

        hashHistory.push(_path);
    },

    //查看是否正在处于非主堆栈
    isPresent:function(){
        return this.mainStack.length > 0;
    },


    //查看是几层堆盏
    deepOfPresent:function(){
        return this.mainStack.length;
    },

    //查看页面是否在顶部
    isTop:function(url){
       let _url;
       if(url){
           _url = url;
       }else{
           _url = window.location.currPath;
       }
       let indexs = this.indexOfPath(_url);
       return (this.mainStack.length == 0 && indexs.length == 1 && indexs[0] == 0);
    },

    //是否前进
    isForward:function(){
       return window.location.type=='forward';
    },

    //是否后退
    isBack:function(){
        return window.location.type=='back';
    },

    //设置是否应该前进
    setForward:function(shouldForward){
        if(shouldForward){
            window.location.type='forward';
        }else{
            window.location.type='back';
        }
    },

    _getPath:function(path){
        if( typeof(path) == 'string'){
            return path;
        }else{
            return path.pathname;
        }
    },

    /*
     * [_init 初始化]
     */
    _init:function(){
        let __router_handle_path__ = '/';
        if ('' == window.location.hash){
            //在web上可以，但在iOS里面会变成一堆路径，先临时改一下
            if ('http:' == window.location.protocol || 'https:' == window.location.protocol){
                let url = window.location.href;
                __router_handle_path__  = url.substring(url.indexOf('#')+1,url.indexOf('?'));
                __router_handle_path__ = __router_handle_path__ ? __router_handle_path__ : '/';
            }
        }else{
            let _paths = (new RegExp('#\(/[A-Za-z_0-9/-]*\)').exec(window.location.hash));
            if (_paths.length > 1){
                __router_handle_path__  = _paths[1];
            }
        }
        this.pushToHash(__router_handle_path__);
    },

    pushToHash:function(path){
        console.log(path)
        if (this.routeHashs.length > 0){
            const lastHash = this.routeHashs[this.routeHashs.length-1];
            if(path !== lastHash){
                this.routeHashs.push(path);
            }
        }else{
            this.routeHashs.push(path);
        }
    }
};

//初始化
RouterHandle._init();

export default RouterHandle;
