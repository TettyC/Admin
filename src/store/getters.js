import variables from '@/styles/variables.scss'

// 快捷访问

const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  /**
   * @description return ture, 说明用户信息已存在
   * @date 24/11/2021
   * @param {*} state
   */
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}',
  cssVar: () => variables,
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language
}

export default getters
