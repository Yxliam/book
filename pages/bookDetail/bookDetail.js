var util = require('../../utils/util')
Page({
    data:{
        isShowPartContent: true,
        bookContent:'',
        bookDetail:{},
        bookTags:[],
        bookAllContent:'',
        bookPartContent:'',
        bookStatus:'',
        bookId:''
    },
    doShowAllContent: function() {
        var isShowPartContent = !this.data.isShowPartContent;
        this.setData({
            isShowPartContent: isShowPartContent
        })
    },
    getBookDetail: function(id){
        var that = this;
        var url = '/m/book/' + id;
        util.http('GET',url, {}, (response) => {
            console.log( response );
            if (response.errMsg) {
                util.showModel(response.errMsg);
            } else {
                var array = response.book.tags ? (response.book.tags + '').replace(/[\[\]]/g, '').split(', ') : '';
                that.setData({
                    bookDetail: response,
                    bookTags: array,
                    bookAllContent: response.book.content,
                    bookContent: response.book.content,
                    bookPartContent: response.book.content ? response.book.content.substring(0, 100) + '...': '',
                    bookStatus: response.bookStatus
                })
            }
        })
    },
    goBookTag(e) {
        wx.navigateTo({
            url: '../../pages/bookTag/bookTag?tag=' + e.currentTarget.dataset.tag
        })
    },
    onLoad(option){
        this.setData({
            bookId:option.id
        })
        this.getBookDetail(this.data.bookId)
    }
})