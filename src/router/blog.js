const { 
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
  } = require('../controller/blog')
const { SuccessModel, ErrorModel }= require('../model/resModle')

// 统一的登入验证函数

const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('尚未登入')
    )
  } 
}

const handleBlogRouter = (req, res) => {
  const method = req.method 
  const id = req.query.id
  // 获取博客列表 
  if (method  ===  'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || ''
    let keyword = req.query.keyword || ''
    if(req.query.isadmin) {
      // 管理员界面
      const loginCheckResult = loginCheck(req)
      if (loginCheckResult) {
        // 未登入
        return loginCheckResult
      }
      //强制查询自己的博客
      author = req.session.username
    }
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
    const loginCheckResult = loginCheck (req)
     if (loginCheckResult) {
       return loginCheckResult
     }
    const author = 'wangxiping'
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
   // 
   // 更新一篇博客 
  if (method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckResult = loginCheck (req)
     if (loginCheckResult) {
       return loginCheckResult
     }
    
    const result = updateBlog (id, req.body)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }   
    })
  }
  // 删除一篇博客 
  if (method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckResult = loginCheck (req)
     if (loginCheckResult) {
       return loginCheckResult
     }
    const author = req.session.username
    const result = deleteBlog(id, author)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除失败')
      }   
    })
  }
}

module.exports = handleBlogRouter