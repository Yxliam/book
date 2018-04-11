var  util = require('../../utils/util.js')
Page({
    data:{
        moreBookList:[],
        getOption: {},
        num:1,
        oldListArray:[],
        loadMore:'加载更多',
        isLoading:false
    },
    getMoreBookList(type, page, flag) {
        var that = this;
        var url = '/app/getMore';
        var data = {
            type: type,
            page: page,
            pageSize: 10
        };
        util.http('GET', url, data, (response) => {
            console.log( response );
            if(response.errMsg) {
                util.showModel(response.errMsg);
            } else {
                if(flag){
                    this.setData({
                        moreBookList: that.data.moreBookList.concat(response.bookList)
                    })
                }else{
                    that.setData({
                        moreBookList: response.bookList
                    })
                }
            }
        })
    },
    goBookDetail:function(e){
        wx.navigateTo({
            url: '../../pages/bookDetail/bookDetail?id=' + e.currentTarget.dataset.id
        })
    },
    setNavigationBarTitleText:function(option){
        //设置标题
        wx.setNavigationBarTitle({
            title: option.category
        })
    },
    getMoreBookTypeList() {
        //this.setData 修改data的数据
        this.setData({
            num: (this.data.num) + 1
        })
        this.oldListArray = this.data.moreBookList;
        var page = (this.data.num);
        this.getMoreBookList(this.getOption.type, page, true);     
    },
     // 刷新数据
     onPullDownRefresh: function(){
        this.getMoreBookList(this.getOption.type, '1', false);
        wx.stopPullDownRefresh();
    },
    // 加载更多
    onReachBottom: function() {
        this.getMoreBookTypeList();
    },
    onLoad: function(option){
        //option 是query参数
        this.getOption = option;
        this.setNavigationBarTitleText(option);
        this.getMoreBookList(option.type, '1');
    },
})