const { exec } = require ('../db/mysql.js')

const getList = (author, keyword) => {
  // 先返回假数据
  let sql = `select * from blogs where 1=1`
  if (author) {
    sql += `and author=${author}`
  }
  if (keyword) {
    sql += `and title  like '%${keyword}%'`
  }
  sql += `order by createtime desc;`
 
  return exec(sql)
}

const getDetail = (id) => {

  return [
    {
      id: 1,
      title: '标题1',
      content: '内容A',
      createTime: '1545456465465',
      author: 'wangxiping'
      
    },
  ]
} 

const newBlog = (blogData = {}) => {
  console.log(blogData, 'newblog')
  // blogData 是一个对象 包含title content
  return {
    id: 3 // 表示
  }
}

const updateBlog = (id, blogData = {}) => {
  console.log(id, blogData)
  return true
}

const deleteBlog = (id) => { 
  console.log(id)
  return true
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}