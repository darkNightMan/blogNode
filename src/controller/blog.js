const { exec } = require ('../db/mysql.js')

const getList = (author, keyword) => {
  // 先返回假数据
  let sql = `select * from blogs where 1=1 `
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
  let sql =  `select * from blogs where id=${id}` 
  return exec(sql).then(rows => {
    return rows[0]
  })
} 

const newBlog = (blogData = {}) => {
  console.log(blogData, 'newblog')
  // blogData 是一个对象 包含title content
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()
  const sql = `insert into blogs (title, content, author, createtime) 
                values ('${title}', '${content}', '${author}', ${createtime})` 
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
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