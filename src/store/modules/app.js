import { LANG, TAG_VIEWS } from '@/constant'
import { setItem, getItem } from '@/utils/storage'
import router from '@/router'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAG_VIEWS) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    /**
     * @description 添加tags
     * @date 30/11/2021
     * @param {*} state
     * @param {*} tag
     */
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => item.path === tag.path)
      // 处理重复
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAG_VIEWS, state.tagsViewList)
      }
    },
    /**
     * @description 修改对应位置的tag
     * @date 30/11/2021
     * @param {*} state
     * @param {*} { index, tag }
     */
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAG_VIEWS, state.tagsViewList)
    },
    /**
     * @description
     * @date 01/12/2021
     * @param {*} state
     * @param {*} payload
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        state.tagsViewList = state.tagsViewList.splice(payload.index, 1)
        router.push(state.tagsViewList[0].fullPath)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(payload.index + 1)
        router.push(state.tagsViewList[state.tagsViewList.length - 1].fullPath)
      }
      setItem(TAG_VIEWS, state.tagsViewList)
    }
  }
}
