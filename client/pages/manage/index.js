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
