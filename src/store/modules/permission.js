import { privateRoutes, publicRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    routes: publicRoutes
  }),
  mutations: {
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * @description 根据权限数据筛选路由
     * @date 28/12/2021
     * @param {*} context
     * @param {*} menus 权限数据
     */
    filterRoutes(context, menus) {
      const routes = []

      menus.forEach((key) => {
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })

      // 不匹配的路由全部重定向404页面
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })

      context.commit('setRoutes', routes)

      return routes
    }
  }
}
