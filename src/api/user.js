import request from '@/utils/request'

/**
 * @description 获取项目功能
 * @date 03/12/2021
 * @return {*}
 */
export const feature = () => {
  return request({
    url: '/user/feature'
  })
}

/**
 * @description 获取项目章节
 * @date 03/12/2021
 * @return {*}
 */
export const chapter = () => {
  return request({
    url: '/user/chapter'
  })
}
