var qcloud = require('../vendor/wafer2-client-sdk/index')
const config = require('../config.js')

const Request = (url, data = {}, method = 'GET') => {
  const session = qcloud.Session.get()
  // if (session) {
  let openId = session ? session.userinfo.openId : ''
  let userId = wx.getStorageSync('currentUserId') || ''
  let bookId = wx.getStorageSync('currentBookId') || ''
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        openId,  // 后台接口直接拿openId  没有的话直接返回未登录
        userId,
        bookId
      },
      success(result) {
        resolve && resolve(result.data)
      },
      fail(error) {
        reject && reject(error)
      }
    })
  })
  // } 
  // else {
  //   return Login()
  // }
}

const Login = () => {
  const session = qcloud.Session.get()
  if (session) {
    return new Promise((resolve, reject) => {
      qcloud.loginWithCode({
        success: res => {
          // this.setData({ userInfo: res, logged: true })
          console.log('登录成功')
          resolve && resolve(res)
        },
        fail: err => {
          // console.error(err)
          console.log('登录错误', err.message)
          reject && reject(err)
        }
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      qcloud.login({
        success: res => {
          console.log('登录成功')
          resolve && resolve(res)
        },
        fail: err => {
          console.log('登录错误', err.message)
          reject && reject(err)
        }
      })
    })
  }
}

const Service = {
  login: () => {
    return Login()
  },
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
    return Request(config.service.bookUrl)
  },
  modifyBook: (id, data = {}) => {
    return Request(`${config.service.bookUrl}/${id}`, data, 'PUT')
  },
  getBookUsers: (id, data = {}) => {
    return Request(`${config.service.bookUrl}/${id}/member`, data)
  },
  relateBook: (id, data={}) => {
    return Request(`${config.service.bookUrl}/${id}/member`, data, 'POST')
  }
}

module.exports = Service