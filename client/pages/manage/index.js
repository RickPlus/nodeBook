//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    memberList: [],
    currentBookName: '我的账本'
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
