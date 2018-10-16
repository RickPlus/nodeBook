//index.js
const Service = require('../../utils/service.js')

Page({
  data: {
    bookName: ''
  },
  onShow () {
    let currentBookId = wx.getStorageSync('currentBookId')
    let list = wx.getStorageSync('bookList')
    if (list && list.length && currentBookId) {
      let item = wx.getStorageSync('bookList').find(o => (o.book_id || o.id) === currentBookId)
      this.setData({
        bookName: item.name
      })
    }
  },
  inputValue(e) {
    this.setData({
      bookName: e.detail.value
    })
  },
  save () {
    let id = wx.getStorageSync('currentBookId')
    Service.modifyBook(id, {
      name: this.data.bookName
    }).then((res) => {
      let { code, data } = res
      if (code === 0) {
        let bookList = wx.getStorageSync('bookList')
        bookList.map((o) => {
          if (o.id === id) {
            o.name = this.data.bookName
          }
        })
        wx.setStorageSync('bookList', bookList)
        wx.switchTab({
          url: '/pages/manage/index'
        })
      }
    })
  }
})
