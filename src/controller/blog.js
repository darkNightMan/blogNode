const getList = (author, keyword) => {
  // 先返回假数据
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容A',
      createTime: '1545456465465',
      author: 'wangxiping'
      
    },
    {
      id: 2,
      title: '标题2',
      content: '内容B',
      createTime: '54654654654564',
      author: 'wangxiping'
      
    },
    {
      id: 3,
      title: '标题3',
      content: '内容C',
      createTime: '1545456465465',
      author: 'wangxiping'
      
    }
  ]
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