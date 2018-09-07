const { mysql } = require('../qcloud')
async function get(ctx, next) {
  let oR = await mysql.select().table('record').where('book_id', 1).orderBy('created_at', 'desc');
  ctx.state.data = oR
}

async function create(ctx, next) {
  let {content, cost} = ctx.request.body
  let userId = ctx.req.headers.userid
  let bookId = ctx.req.headers.bookid
  console.log(content, cost, userId)
  // let oR = await mysql.table('record').insert();
  // ctx.state.code = 1
  // ctx.state.data = oR
  let id = await mysql('record').insert({
    content,
    cost,
    user_id: userId,
    book_id: bookId
  }).then(result => result[0])
  ctx.state.data = await mysql('record').where('id', id).then(result => result[0])
}

module.exports = {
  get,
  create
}
