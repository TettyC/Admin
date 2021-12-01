// 快捷访问

import { MAIN_COLOR } from '@/constant'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'

const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  /**
   * @description return ture, 说明用户信息已存在
   * @date 24/11/2021
   * @param {*} state
   */
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}',

  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  tagsViewList: (state) => state.app.tagsViewList,

  cssVar: (state) => ({
    ...state.theme.variables,
    ...generateColors(getItem(MAIN_COLOR))
  }),
  mainColor: (state) => state.theme.mainColor
}

export default getters
