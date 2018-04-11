Page({
    data:{
        userInfo:null,
    },
    onReady(){
        var _this = this;
        wx.getUserInfo({
            success:function(res){
                console.log( res );
                _this.setData({
                    userInfo:res.userInfo
                })
            }
        })
    }
})