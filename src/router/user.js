const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel }= require('../model/resModle')


const handleUserRouter = (req, res) => {
  const method = req.method  
    // 获取博客列表 
  if (method  ===  'POST' && req.path === '/api/user/login') {
    const {username , password} = req.body
    const result = loginCheck(username, password)

    return result.then(data => {
      if (data.username !== username) {
        return new ErrorModel('账号不存在')
      }
      if (data.password !== password) {
        return new ErrorModel("密码错误")
      }
      return new SuccessModel('登入成功')
    })   
  }
}

module.exports = handleUserRouter