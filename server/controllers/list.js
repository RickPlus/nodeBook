const { mysql } = require('../qcloud')
async function get(ctx, next) {
  let oR = await mysql.select().table('record').where('book_id',1);
  ctx.state.code = 1
  ctx.state.data = oR
}

async function create(ctx, next) {
  // let oR = await mysql.select().table('record').where('book_id', 1);
  // ctx.state.code = 1
  // ctx.state.data = oR
}

module.exports = {
  post
}
