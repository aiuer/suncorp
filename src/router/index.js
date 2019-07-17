import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/log',
    component: () => import('../pages/log/log'),
    children: [
      {
        path: '/log/login',
        component: () => import('../pages/log/login')
      },
      {
        path: '/log/regist',
        component: () => import('../pages/log/regist')
      },
      {
        path: '/log/updateCode',
        component: () => import('../pages/log/updateCode')
      }
    ]
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('../pages/index/index')
  },
  {
    path: '/logmanage',
    component: () => import('../pages/mylog')
  },
  {
    path: '/add',
    component: () => import('../pages/users/addWorknews'),
    meta: {
      requireLogin: true // 当前路由需要校验，不需要就不用写
    }
  },
  {
    path: '/interact',
    component: () => import('../pages/interactBox/index'),
    children: [
      {
        path: '/interact/vote',
        component: () => import('../pages/interactBox/components/vote')
      },
      {
        path: '/interact/public',
        component: () => import('../pages/interactBox/components/public')
      },
      {
        path: '/interact/policy',
        component: () => import('../pages/interactBox/components/policy')
      },
      {
        path: '/interact/readLetters',
        component: () => import('../pages/interactBox/components/read')
      },
      {
        path: '/interact/writeLetters',
        component: () => import('../pages/interactBox/components/write')
      }
    ]
  },
  {
    path: '/updateCode',
    component: () => import('../pages/log/updateCode')
  },
  {
    path: '/user',
    component: () => import('../pages/users/master'),
    // meta: {
    //   requireLogin: true // 当前路由需要校验，不需要就不用写
    // },
    children: [
      {
        path: '/user/personality',
        component: () => import('../pages/users/personality'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/systemManage',
        component: () => import('../pages/users/systemManage'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/addWorkNews',
        component: () => import('../pages/users/addWorknews'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/area_manage', // 片区管理员管理信件
        component: () => import('../pages/users/area_manage'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/admin_receive', // 局长查看收件箱
        component: () => import('../pages/users/admin_receive'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/user_receive', // 收件箱
        component: () => import('../pages/users/user_receive'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/user_send', // 发件箱
        component: () => import('../pages/users/user_send'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/manageUserInfo',
        component: () => import('../pages/users/userinfoManage'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/userPermitManage',
        component: () => import('../pages/users/userPermitManage'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      },
      {
        path: '/user/voteManage',
        component: () => import('../pages/users/voteManage'),
        meta: {
          requireLogin: true // 当前路由需要校验，不需要就不用写
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
