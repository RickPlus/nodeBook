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
  ctx.cookies.set('test','121212')
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

module.exports = {
  get,
  put
}
