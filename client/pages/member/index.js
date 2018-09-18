//index.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const Service = require('../../utils/service.js')

Page({
  data: {
    userList: [],
    currentBookName: ''
  },
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log('shareMenu share success')
        console.log(res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })
  },
  onShareAppMessage: function (res) {
    const session = qcloud.Session.get()
    let userInfo = session.userinfo
    let bookId = wx.getStorageSync('currentBookId')
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }

    let obj = {
      title: `${userInfo.nickName}邀请您加入家庭记账`,
      path: `/pages/index/index?from_pid=${userInfo.openId}&from_bookid=${bookId}`
    }
    console.log(obj)
    return obj
  },
  onShow () {
    let bookList = wx.getStorageSync('bookList')
    let currentBookId = wx.getStorageSync('currentBookId')
    bookList && currentBookId && this.setData({
      currentBookName: bookList.find(o => o.id === currentBookId).name
    })
    this.getUserList()
  },
  getUserList () {
    let id = wx.getStorageSync('currentBookId')
    Service.getBookUsers(id).then((res) => {
      let { code, data } = res
      if (code === 0) {
        this.setData({
          userList: data.userList
        })
      }
    })
  }
})
