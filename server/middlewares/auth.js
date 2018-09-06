/**
 * header 验证
 */
module.exports = async (ctx, next) => {
  const openId = ctx.req.headers.openid || null
  if (openId) {
    await next() 
  } else {
    ctx.status = 200

    // 输出详细的错误信息
    ctx.body = {
      code: -2,
      error: '用户未登录'
    }
  }
}
