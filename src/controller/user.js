
const { exec } = require ('../db/mysql.js')

const login = (username,  passwrod) => {
  const sql = `select username, realname, password from users where username='${username}'`
  return exec(sql).then(rows => {
    console.error(rows)
    return rows[0] || {}
  })
} 
module.exports = {
  login
}