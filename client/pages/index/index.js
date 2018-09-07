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
    bookIndex: 0,
    isLoaded: false
  },
  onLoad () {
    // this.setData({
    //   isLoaded: true
    // })
    // Service.login().then((res) => {
    //   // console.log(res)
    //   this.getBookList()
    //   // this.getList()
    // })
  },
  onShow () {
    if (this.data.isLoaded) {
      wx.getStorageSync('list') && this.setListData(wx.getStorageSync('list'))
      wx.getStorageSync('bookList') && wx.getStorageSync('currentBookId') && this.setBookData(wx.getStorageSync('bookList'), wx.getStorageSync('currentBookId'))
    } else {
      this.setData({
        isLoaded: true
      })
      Service.login().then((res) => {
        // console.log(res)
        this.getBookList()
        // this.getList()
      })
    }
  },
  getBookList () {
    Service.getBookList().then((res) => {
      let { code, data } = res
      this.setBookData(data.list, data.defaultBookId)
      wx.setStorageSync('currentUserId', data.currentUserId)
      wx.setStorageSync('currentBookId', data.defaultBookId)
      this.getList()
      wx.setStorageSync('bookList', data.list)
    })
  },
  setListData (list) {
    list && list.length && list.map((o) => {
      o.created_at_format = util.formatDate(new Date(o.created_at), 'yyyy-MM-dd hh:mm:ss')
      o.updated_at_format = util.formatDate(new Date(o.updated_at), 'yyyy-MM-dd hh:mm:ss')
    })
    this.setData({
      list: list
    })
  },
  setBookData (list, defaultId) {
    let arr = []
    list.forEach((o) => {
      arr.push(o.name)
    })
    this.setData({
      bookList: arr,
      bookIndex: list.findIndex(o => o.id === defaultId)
    })
  },
  getList () {
    var self = this
    Service.getList().then((res) => {
      let {code, data} = res
      this.setListData(data)
      wx.setStorageSync('list', data)
    })
  },
  selectBook (e) {
    this.setData({
      bookIndex: e.detail.value
    })
    // todo 切换账本后 更新list数据
    this.getList()
  },
  add () {
    wx.navigateTo({
      url: '/pages/add/index'
    })
  }
})
