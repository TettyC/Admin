import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

// 路由前置守卫
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    // 用户已登录，不允许进入login
    to.path === '/login' ? next('/') : next()
  } else {
    // 用户未登录，只允许进入login
    whiteList.indexOf(to.path) > -1 ? next() : next('/login')
  }
})
