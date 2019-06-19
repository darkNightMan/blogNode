const { getList, getDetail } = require('../controller/blog')
const { SuccessModel, ErrorModel }= require('../model/resModle')

const handleBlogRouter = (req, res) => {
  const method = req.method 
  // 获取博客列表 
  if (method  ===  'GET' && req.path === '/api/blog/list') {

    const author = req.query.author || ''
    const keyword = req.query.keyword || ''

    const listData = getList(author, keyword)

    return new SuccessModel(listData)
  }
   // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const id = req.query.id
    const data = getDetail(id)
    return new SuccessModel(data)
  }
  // 新增一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: ' 这是新增博客接口'
    }
  }
   // 
   // 更新一篇博客 
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: ' 这是新增更新一篇博客 '
    }
  }
  // 删除一篇博客 
  if (method === 'POST' && req.path === '/api/blog/delete') {
    return {
      msg: ' 这是删除一篇博客'
    }
  }
}

module.exports = handleBlogRouter