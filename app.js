const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring') 
const { get, set } = require('./src/db/redis')

// SESSION_DATA
// const SESSION_DATA = {}
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  console.log ('d.toGMTString()', d.toGMTString())
  return d.toGMTString()
}
// 用于处理post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })

    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json')
  const url = req.url
  req.path = url.split('?')[0]
  // 解析query  
  req.query = querystring.parse(url.split('?')[1])
  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || '' 
  cookieStr.split(';').forEach(item => {
    if (!item) return
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })
  // let needSetCookie = false
  // let userId = req.cookie.userid
  // if(userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {}     
  //   }
  // } else {
  //   needSetCookie = true
  //   userId = `${Date.now()}_${ Math.random()}`
  //   SESSION_DATA[userId] = {}       
  // }
  // req.session = SESSION_DATA[userId]
  // 
  // 解析 seession 使用redis
  let needSetCookie = false
  let userId = req.cookie.userid
  if(!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${ Math.random()}`
    // 初始化session
    set(userId,{})
  }
  // 获取session  
  req.sessionId = userId
  get(req.sessionId).then(sessionData => {
    if (sessionData === null) {
      set(req.sessionId,{})
      // 设置 session
      req.session = {}
    } else {
      req.session = sessionData
    }
    console.log('req session', sessionData)
    return getPostData(req)
  })
  // 处理postData
  .then(postData => {
    req.body = postData
    // 处理blog 路由
    const blogResult = handleBlogRouter(req, res)
    
    if (blogResult) {
      blogResult.then(blogData => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          }
          res. end(
            JSON.stringify(blogData)
          )
      })
      return
    }
    // 处理 user 路由
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId};`)
        }
        res. end(
          JSON.stringify(userData)
        )
      })
      return
    }
    // 未名字路由 返回 404 
    res.writeHead(404, { "Content-type" : "text/plain" })
    res.write("404 Not Found")
    res.end()
  })  
} 

module.exports = serverHandle

// process.env.NODE_ENV