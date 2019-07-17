import {lazy} from './lazyLoading'
export default (routers, data) => {
  // 重新遍历一下，获取服务端数据，这个component属性是一个字符串转化成组件
  generaMenu(routers, data)
}

function generaMenu (routers, data) {
  console.log(data)// 数组
  data.forEach((item) => {
    let menu = Object.assign({}, item)
    menu.component = lazy(item.permit_url)
    if (item.children) {
      menu.children = []
      generaMenu(menu.children, item.children)
    }
    routers.push(menu)
    console.log(menu)
  })
}
