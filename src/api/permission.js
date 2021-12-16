import request from '@/utils/request'

/**
 * @description 获取所有权限
 * @date 16/12/2021
 * @return {*}
 */
export const permissionList = () => {
  return request({
    url: '/permission/list'
  })
}
