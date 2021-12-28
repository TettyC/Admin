import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 用户已登录，不允许进入login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户信息是否存在，如不存在，则获取用户信息
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限，筛选出需要添加的路由
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 添加路由
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })

        // 添加路由后，需要主动跳转生效路由
        return next(to.path)
      }
      next()
    }
  } else {
    // 用户未登录，只允许进入login
    whiteList.indexOf(to.path) > -1 ? next() : next('/login')
  }
})
