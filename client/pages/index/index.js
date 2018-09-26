//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var Service = require('../../utils/service.js')
var app = getApp()

Page({
  onLoad (query) {
    if (query && query.from_bookid && query.from_pid) {
      wx.setStorageSync('queryPid', query.from_pid)
      wx.setStorageSync('queryBid', query.from_bookid)
    }
    let session = qcloud.Session.get()
    if (session && session.userinfo) {
      this.bindGetUserInfo()
    }
  },
  bindGetUserInfo () {
    this.goToList()
  },
  goToList () {
    wx.switchTab({
      url: '/pages/list/index'
    })
  }
})
