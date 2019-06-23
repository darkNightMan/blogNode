const env = process.env.NODE_ENV //  环境变量

// 配置

let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'csdewang',
    database: 'blogs'
  }
} 

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'csdewang',
    database: 'blogs'
  }
}

module.exports = {
  MYSQL_CONF
}