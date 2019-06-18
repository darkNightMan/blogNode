const handleBlogRouter = (req, res) => {
  const method = req.method 
  const url = req.url
  const path = url.split('?')[0]

  // 获取博客列表 
  if (method  ===  'GET' && path === '/api/blog/list') {
    return {
      msg: '这是获取博客列表的接口'
    }
  }
}