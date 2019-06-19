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
module.exports = {
  getList,
  getDetail
}