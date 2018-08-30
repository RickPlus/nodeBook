async function get(ctx, next) {
  ctx.state.code = 1
  ctx.state.data = [
    {
      content: '测试数据1',
      date: '2018-08-30',
      val: -50
    },
    {
      content: '测试数据2',
      date: '2018-08-30',
      val: 50
    },
    {
      content: '测试数据3',
      date: '2018-08-30',
      val: -20
    },
    {
      content: '测试数据4',
      date: '2018-08-30',
      val: -30
    }
  ]
}

module.exports = {
  get
}
