//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
      list: []
  },
  onLoad: function () {
    this.getList()
  },
  getList: function () {
    var self = this
    wx.request({
      url: config.service.listGetUrl,
      success(result) {
        // util.showSuccess('请求成功完成')
        self.setData({
          list: result.data.data
        })
        console.log(self.data)
      },
      fail(error) {
        // util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  }
})
