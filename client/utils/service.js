const config = require('../config.js')

const Request = (url, data = {}, method = 'GET') => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      success(result) {
        resolve && resolve(result.data)
      },
      fail(error) {
        reject && reject(error)
      }
    })
  })
}

const Service = {
  // 获取账单列表
  getList: (data = {}) => {
    // storage 存储 key：list
    return Request(config.service.listUrl, data)
  },
  // 添加账单
  addList: (data= {}) => {
    return Request(config.service.listUrl, data, 'POST')
  },
  getBookList: (data = {}) => {
    // storage 存储 bookList
    return Request(config.service.listU)
  }
}

module.exports = Service