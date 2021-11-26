import path from 'path'

/**
 * @description 所有的子集路由
 * @date 25/11/2021
 * @param {*} routes
 * @return {*}
 */
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route?.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') {
    return true
  }
  if (JSON.stringify(data) === '[]') {
    return true
  }
}

/**
 * @description 处理脱离层级的路由
 * @date 25/11/2021
 */
export const filterRoutes = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)

  // TODO 理解下列代码
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}
/**
 * @description 根据routes数据，返回对应的menu规则数据
 * @date 25/11/2021
 */
export const generateMenus = (routes, basePath = '') => {
  const result = []
  routes.forEach((item) => {
    if (isNull(item.children) && isNull(item.meta)) {
      return
    }
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }

    const routePath = path.resolve(basePath, item.path)

    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }

    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })

  return result
}
