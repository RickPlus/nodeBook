const { mysql } = require('../qcloud')
async function get(ctx, next) {
  let openId = ctx.req.headers.openid
  // let oR = await mysql.select().table('book').where('book_id',1);
  let [
    one,
    currentUserId = '',
    defaultBookId = '', 
    list = []
  ] = [
    await mysql('user').where('weixin_openid', openId).then(result => result[0])]
  /** 
  * 有账本
  * */
  if (one) {
    let uid = one['id']
    let bookuser = await mysql('bookuser').where('user_id', uid)
    let book = []
    // bookuser.length && bookuser.forEach( async (o) => {
    //   let item = await mysql('book').where('id', o['book_id']).then(result => result[0])
    //   book.push(item)
    // })
    if (bookuser.length) {
      for (let i = 0; i< bookuser.length; i++) {
        let item = await mysql('book').where('id', bookuser[i]['book_id']).then(result => result[0])
        book.push(item)
      }
    }
    defaultBookId = one['default_bookid']
    currentUserId = uid
    list = book
    // book.length && book.forEach((o) => {
    //   list.push({
    //     book_id: o.id,
    //     name: o.name,
    //     create_userid: o.create_userid
    //   })
    // })
  } else {
    let defaultName = '默认账本'
    /** 
     * 没账本
     * */

    // 插入用户表
    let uid = await mysql('user').insert({
      weixin_openid: openId
    }).then(result => result[0])

    // 新增book
    let bid = await mysql('book').insert({
      name: defaultName,
      create_userid: uid
    }).then(result => result[0])
    // 新增关联关系
    await mysql('bookuser').insert({
      book_id: bid,
      user_id: uid
    })
    // 设置为默认
    await mysql('user').where('id', uid).update('default_bookid', bid)

    defaultBookId = bid
    currentUserId = uid
    list = [
      {
        book_id: bid,
        name: defaultName,
        create_userid: uid
      }
    ]
  }
  
  ctx.state.data = {
    defaultBookId,
    currentUserId,
    list
  }
  // ctx.state.code = 1
  // ctx.state.data = oR
}

async function put (ctx, next) {
  let { name } = ctx.request.body
  let { id } = ctx.params
  ctx.state.data = await mysql('book').where('id', id).update('name', name)
  
}

async function getMember (ctx, next) {
  let { id } = ctx.params
  let bookUserList = await mysql('bookuser').where('book_id', id)
  let userList = []
  if (bookUserList.length) {
    for (let i = 0; i < bookUserList.length; i++) {
      let item = await mysql('user').where('id', bookUserList[i]['user_id']).then(result => result[0])
      let sessionInfo = await mysql('cSessionInfo').where('open_id', item['weixin_openid']).then(result => result[0])
      item.user_info = JSON.parse(sessionInfo.user_info)
      userList.push(item)
    }
  }
  ctx.state.data = {
    userList
  }
}

async function setMember(ctx, next) {
  let { id } = ctx.params
  let { pid } = ctx.request.body
  let openId = ctx.req.headers.openid
  let userId = ctx.req.headers.userid

  let isExist = await mysql('bookuser').where({ 'book_id': id, 'user_id': userId }).then(result => result[0])
  if (!isExist){
    let inviter = await mysql('user').where('weixin_openid', pid).then(result => result[0])
    let bookuser = await mysql('bookuser').where({ 'book_id': id, user_id: inviter['id'] }).then(result => result[0])
    if (bookuser) {
      await mysql('bookuser').insert({
        book_id: id,
        user_id: userId
      })
      let book = await mysql('book').where('id', id).then(result => result[0])
      ctx.state.data = {
        book
      }
    } else {
      ctx.state.code = -1
    }
  }
}

module.exports = {
  get,
  put,
  getMember,
  setMember
}
