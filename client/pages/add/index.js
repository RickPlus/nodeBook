// pages/add/index.js
const Service = require('../../utils/service.js')
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
    Service.addList({
      cost: this.data.cost,
      content: this.data.content}
    ).then((res) => {
      let {code} = res
      if (code === 1) {
        let arr = self.data.listPage.data.list
        arr.unshift({
          cost: self.data.cost,
          content: self.data.content
        })
        wx.setStorageSync('list', arr)
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  }
})