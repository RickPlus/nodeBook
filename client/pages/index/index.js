//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
      list: []
  },
  onLoad () {
    this.getList()
  },
  getList () {
    var self = this
    wx.request({
      url: config.service.listGetUrl,
      success(result) {
        // util.showSuccess('请求成功完成')
        let {data} = result.data || []
        // 增加两个format字段便于显示 ps:wx没有filter 只能这样修改了...
        data && data.length && data.map((o) => {
          o.created_at_format = util.formatDate(new Date(o.created_at))
          o.updated_at_format = util.formatDate(new Date(o.updated_at))
        })
        console.log(data)
        self.setData({
          list: data
        })
      },
      fail(error) {
        // util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  }
})
