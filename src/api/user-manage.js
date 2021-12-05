import request from '@/utils/request'

/**
 * @description 获取用户列表数据
 * @date 04/12/2021
 * @param {*} data
 * @return {*}
 */
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}

/**
 * @description 批量上传
 * @date 04/12/2021
 * @param {*} data
 * @return {*}
 */
export const userBatchImport = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}

/**
 * @description 删除指定数据
 * @date 05/12/2021
 * @param {*} id
 */
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/detele/${id}`
  })
}
