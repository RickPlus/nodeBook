//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var Service = require('../../utils/service.js')
var app = getApp()

Page({
  data: {
    list: [],
    bookList: [
      '我的账本',
      '测试1'
    ],
    bookIndex: 0
  },
  onLoad () {
    this.getList()
  },
  onShow () {
    let arr = wx.getStorageSync('list')
    arr.length && this.setData({
      list: arr
    })
  },
  getList () {
    var self = this
    Service.getList().then((res) => {
      let {code, data} = res
      data && data.length && data.map((o) => {
        o.created_at_format = util.formatDate(new Date(o.created_at))
        o.updated_at_format = util.formatDate(new Date(o.updated_at))
      })
      self.setData({
        list: data
      })
      wx.setStorageSync('list', data)
    })
  },
  selectBook (e) {
    this.setData({
      bookIndex: e.detail.value
    })
    // todo 切换账本后 更新list数据
  },
  add () {
    wx.navigateTo({
      url: '/pages/add/index'
    })
  }
})
