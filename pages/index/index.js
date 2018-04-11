//index.js
//获取应用实例
var  util = require('../../utils/util.js')
Page({
    data:{
      goodBookList:[],
      hotBookList:[],
      pictureList:[],
      newsList:[],
      partList:[],
      newBookList:[]
    },
    getIndexList: function() {
      var that = this;
      var url = '/app/getIndexInfo';
      util.http('GET', url , {}, (response) => {
          console.log( response );
          if (response.errMsg) {
              util.showModel(response.errMsg);
          } else {
              console.log('请求首页列表接口成功！');
              that.setData({
                  pictureList: response.pictureList || [],
                  newsList: response.newsList || [],
                  partList: response.partList || [],
                  newBookList: response.newBookList || [],
                  goodBookList: response.goodBookList || [],
                  hotBookList: response.hotBookList || []
              })
          }
      })
  },
  goMoreBook(e){
      //逻辑跳转
    wx.navigateTo({
        url: '../../pages/moreBook/moreBook?type=' + e.currentTarget.dataset.type + '&category=' + e.currentTarget.dataset.category
    })
},
    onPullDownRefresh: function() {
      this.getIndexList();
      wx.stopPullDownRefresh();
  },
  onReady: function() {
    this.getIndexList();
  }
})
