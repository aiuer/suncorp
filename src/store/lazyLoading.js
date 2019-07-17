// 懒加载组件
function lazy (name) {
  if (name !== 'dashboard') {
    return () => resolve => { require(['../pages' + name + '.vue'], resolve) }
  }
}
export {lazy}
