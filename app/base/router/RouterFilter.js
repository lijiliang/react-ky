
const RouterFilter={
    process:function(nextState, replace, callback,prevState){
        RouterFilter.buttomBarFilter(nextState, replace, callback, prevState)
        callback();
    },
    buttomBarFilter:function(nextState, replace, callback,prevState){
        console.log(nextState,prevState)
        if(nextState.location.pathname=="/login"){
            console.log(window.KYFooterBar)
            // window.KYFooterBar.hideFooter();
            // window.KYFooterBar &&  window.KYFooterBar.refs.KYFooterBar.style.display="none";
        }
    }
}

module.exports=RouterFilter;
