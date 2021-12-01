import i18n from '@/i18n'
import { watch } from 'vue-demi'
import store from '@/store'

export const generateTitle = (title) => {
  return i18n.global.t(`msg.route.${title}`)
}

/**
 * @description 监听语言变化，执行所有回调
 * @date 30/11/2021
 * @param {*} cbs
 */
export const watchSwitchLang = (...cbs) => {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}
