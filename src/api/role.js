import request from '@/utils/request'

/**
 * @description 获取所有角色
 * @date 16/12/2021
 * @return {*}
 */
export const roleList = () => {
  return request({
    url: '/role/list'
  })
}

/**
 * @description 获取指定角色的权限
 * @date 17/12/2021
 * @param {*} id
 * @return {*}
 */
export const rolePermission = (roleId) => {
  return request({
    url: `/role/permission/${roleId}`
  })
}

/**
 * @description 为角色分配权限
 * @date 17/12/2021
 * @param {*} data
 * @return {*}
 */
export const distributePermission = (data) => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
