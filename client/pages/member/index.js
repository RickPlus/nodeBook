//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
const Service = require('../../utils/service.js')

Page({
  data: {
    memberList: [],
    currentBookName: '我的账本'
  },
  onShareAppMessage: function (res) {
    const session = qcloud.Session.get()
    let userInfo = session.userinfo
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }

    return {
      title: `${userInfo.nickName}邀请您加入家庭记账`,
      path: `pages/index/index?from_id=${userInfo.openId}`
    }
    
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
        console.log(res)
      }
    })
  }
})
