import path from 'path'
import i18n from '@/i18n'

/**
 * @description 筛选出可供搜索的路由对象
 * @date 30/11/2021
 * @param {*} routes 路由表
 * @param {string} [basePath='/']
 * @param {*} [prefixTitle=[]]
 * @return {*}
 */
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  let res = []

  for (const route of routes) {
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    const re = /.*\/:.*/
    if (route?.meta?.title && !re.exec(route.path)) {
      const i18nTitile = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitile]
      res.push(data)
    }

    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length > 0) {
        res = [...res, ...tempRoutes]
      }
    }
  }

  return res
}
