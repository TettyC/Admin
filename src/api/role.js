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
