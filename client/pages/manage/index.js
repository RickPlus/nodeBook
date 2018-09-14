//index.js
Page({
  data: {
    memberList: [],
    currentBookName: ''
  },
  onLoad () {
    
  },
  onShow () {
    let bookList = wx.getStorageSync('bookList')
    let currentBookId = wx.getStorageSync('currentBookId')
    bookList && currentBookId && this.setData({
      currentBookName: bookList.find(o => o.id === currentBookId).name
    })
  },
  goMember () {
    wx.navigateTo({
      url: `/pages/member/index`
    })
  },
  goBook () {
    wx.navigateTo({
      url: `/pages/book/index`
    })
  }
  
})
