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
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 用户未登录，只允许进入login
    whiteList.indexOf(to.path) > -1 ? next() : next('/login')
  }
})
