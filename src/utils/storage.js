/**
 * @description 存储数据
 * @date 22/11/2021
 * @param {*} key
 * @param {*} value
 */
const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

/**
 * @description 读取数据
 * @date 22/11/2021
 * @param {*} key
 * @return {*}
 */
const getItem = (key) => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

/**
 * @description 删除指定数据
 * @date 22/11/2021
 * @param {*} key
 */
const removeItem = (key) => {
  localStorage.removeItem(key)
}

/**
 * @description 删除全部数据
 * @date 22/11/2021
 */
const removeAllItem = () => {
  localStorage.clear()
}

export { setItem, getItem, removeItem, removeAllItem }
