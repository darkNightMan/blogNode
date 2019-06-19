

const loginCheck = (username,  passwrod) => {
  if (username === 'wangxiping' && passwrod === '123') {
    return true
  }
  return false
} 
module.exports = {
  loginCheck
}