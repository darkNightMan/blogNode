const { 
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
  } = require('../controller/blog')
const { SuccessModel, ErrorModel }= require('../model/resModle')

const handleBlogRouter = (req, res) => {
  const method = req.method 
  const id = req.query.id
  // 获取博客列表 
  if (method  ===  'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

   // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {   
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // 新增一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {    
    const author = 'wangxiping'
    req.body.author = author
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
   // 
   // 更新一篇博客 
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog (id, req.body)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('更新博客失败')
    }   
  }
  // 删除一篇博客 
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const result = deleteBlog (id)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('更新博客失败')
    }   
  }
}

module.exports = handleBlogRouter