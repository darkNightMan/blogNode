const handleUserRouter = (req, res) => {
  const method = req.method  
    // 获取博客列表 
  if (method  ===  'POST' && req.path === '/api/blog/login') {
    return {
      msg: '登入'
    }
  }
}

module.exports = handleUserRouter