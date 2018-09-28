//index.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
Page({
  data: {
    memberList: [],
    currentBookName: '',
    avatar: ''
  },
  onLoad () {
    
  },
  onShow () {
    let bookList = wx.getStorageSync('bookList')
    let currentBookId = wx.getStorageSync('currentBookId')
    if (bookList && bookList.length && currentBookId) {
      let item = bookList.find(o => o.id === currentBookId)
      this.setData({
        currentBookName: item.name
      })
    }
    const session = qcloud.Session.get()
    let userInfo = session.userinfo
    this.setData({
      avatar: userInfo.avatarUrl
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
