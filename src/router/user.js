const { login } = require('../controller/user')
const { SuccessModel, ErrorModel }= require('../model/resModle')
const { set } = require('../db/redis')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  console.log ('d.toGMTString()', d.toGMTString())
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const method = req.method  
    // 获取博客列表 
  if (method  ===  'POST' && req.path === '/api/user/login') {
    const {username , password} = req.body
    // const {username , password} = req.query  
    const result = login(username, password)
    return result.then(data => {
      if (data.username !== username) {
        return new ErrorModel('账号不存在')
      }
      if (data.password !== password) {
        return new ErrorModel("密码错误")
      }
      // 设置session_ID
      req.session.username = data.username
      req.session.realname = data.realname
      // 同步到 redis
      set(req.sessionId, req.session)
      // res.setHeader('set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}` )
      return new SuccessModel('登入成功')
    })   
  }
}

module.exports = handleUserRouter