/**
 * @description 判断是否为外部资源
 * @date 21/11/2021
 * @param {*} path
 */
export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
