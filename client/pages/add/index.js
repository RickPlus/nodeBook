// pages/add/index.js
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cost: 0,
    content: '',
    listPage: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 获取页面
    let pages = getCurrentPages()
    // 设置listPage为前一页
    this.setData({
      listPage: pages[pages.length - 2]
    })
  },
  inputCost (e) {
    this.setData({
      cost: e.detail.value
    })
  },
  inputContent(e) {
    this.setData({
      content: e.detail.value
    })
  },

  save () {
    let self = this
    wx.request({
      url: config.service.listUrl,
      method: 'POST',
      data: {
        cost: this.data.cost,
        content: this.data.content
      },
      success(result) {
        console.log(result)
        if (result.data.code === 1) {
          let arr = self.data.listPage.data.list
          arr.unshift({
            cost: self.data.cost,
            content: self.data.content
          })
          // 改变前一页的数据
          self.data.listPage.setData({
            list: arr
          })
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      },
      fail(error) {
        // util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  }
})