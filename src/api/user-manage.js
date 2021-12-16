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
 * @description 获取所有用户列表数据
 * @date 05/12/2021
 * @return {*}
 */
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list'
  })
}

/**
 * @description 获取指定用户详情
 * @date 09/12/2021
 * @return {*}
 */
export const userDetail = (id) => {
  return request({
    url: `/user-manage/detail/${id}`
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

/**
 * @description 为员工分配角色
 * @date 16/12/2021
 * @param {*} id
 * @param {*} data
 * @return {*}
 */
export const updateRoles = (id, roles) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: 'POST',
    data: {
      roles
    }
  })
}

/**
 * @description 获取指定员工当前角色
 * @date 16/12/2021
 * @param {*} id
 * @return {*}
 */
export const userRoles = (id) => {
  return request({
    url: `/user-manage/role/${id}`
  })
}
