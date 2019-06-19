const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel }= require('../model/resModle')


const handleUserRouter = (req, res) => {
  const method = req.method  
    // 获取博客列表 
  if (method  ===  'POST' && req.path === '/api/blog/login') {
    const {username , password} = req.body
    const result = loginCheck(username, password)
    if (result) {
      return new SuccessModel()
    }
    return new ErrorModel("登入失败")
  }
}

module.exports = handleUserRouter