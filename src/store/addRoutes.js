import {ADD_ROUTES} from './mutations_type'
import Menufilter from './menufilter'
import router from '../router'
const addRoutes = {
  state: {
    routeData: []
  },
  mutations: {
    [ADD_ROUTES] (state, addrouter) {
      let routes = []
      // 将后台的路由数据components转化成组件
      Menufilter(routes, addrouter)
      // 添加路由
      console.log(routes)
      state.routeData = routes
      router.addRoutes(routes)
    }
  },
  actions: {
    add_Routes ({commit}, addrouter) {
      commit(ADD_ROUTES, addrouter)
    }
  }
}
export default addRoutes
