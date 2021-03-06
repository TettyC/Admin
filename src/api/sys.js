import request from '@/utils/request'

/**
 * @description 登录
 * @date 22/11/2021
 * @param {*} data
 * @return {*} 返回一个Promise对象
 */
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * @description 获取用户信息
 * @date 24/11/2021
 * @return {*}
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/profile'
  })
}
